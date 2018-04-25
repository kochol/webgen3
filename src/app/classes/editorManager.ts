import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { element } from 'protractor';
import { Project } from './project';
import { EditorComponent } from './../components/editor/editor.component';
import * as fs from 'fs';
import { Observable } from "rxjs/Observable";

export class OpenedFile {
    name: string;
    ext: string;
    data: string;
    isSaved: boolean = true;
    index: number; // The index number in array
}

export class EditorManager {
    private static editorMan: EditorManager;

    aceEditor: any;
    private openedFiles: OpenedFile[] = [];
    private openedFiles$: BehaviorSubject<OpenedFile>[] = [];
    private openedFilesCount$ = new BehaviorSubject<number>(0);
    private currentFile: OpenedFile = null;
    private currentFile$ = new BehaviorSubject<OpenedFile>(null);
    private isFileChanging = false;
    private ignoreFirst = true;

    // Get editor manager singlton object
    public static getSingleton(): EditorManager {
        if (this.editorMan == null)
            this.editorMan = new EditorManager();   

        return this.editorMan;
    }

    // Get opened files count
    getOpenedFilesCount(): number {
        return this.openedFiles$.length;
    }

    // Get opened files count Observable
    listenOpenedFilesCount(): Observable<number> {
        return this.openedFilesCount$.asObservable();
    }

    // Get opened file observable by index
    getOpenedFile(index: number): Observable<OpenedFile> {
        return this.openedFiles$[index].asObservable()
    }

    // Get current file observable
    getCurrentFile(): Observable<OpenedFile> {
        return this.currentFile$.asObservable();
    }

    // Init the events
    init() {
        this.aceEditor.getSession().on('change', e => {
            if (this.ignoreFirst) {
                this.ignoreFirst = false;
                return;
            }
            if (this.currentFile && !this.isFileChanging) {
                this.openedFiles[this.currentFile.index].isSaved = false;
                this.openedFiles[this.currentFile.index].data = this.aceEditor.getValue();
                this.openedFiles$[this.currentFile.index].next(
                    this.openedFiles[this.currentFile.index]
                );
            }
            if (this.isFileChanging)
                this.isFileChanging = false;
        });
        this.aceEditor.commands.addCommand({
            name: 'saveCommand',
            bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
            exec: editor => {
                // Save the current file
                this.SaveFile(this.currentFile);
                this.openedFiles[this.currentFile.index].isSaved = true;
                this.openedFiles$[this.currentFile.index].next(
                    this.openedFiles[this.currentFile.index]
                );
            },
            readOnly: false // false if this command should not apply in readOnly mode
        });
    }

    // Save the file to the file system.
    private SaveFile(file: OpenedFile) {
        (<any>window).fs.writeFileSync(Project.getSingleton().path + file.name, file.data);
    }

    // Set the coding highliter for editor
    private setCodeHighliting(ext: string) {
        switch (ext) {
            case 'yaml':
                this.aceEditor.getSession().setMode("ace/mode/yaml");
                break;

            case 'html':
                this.aceEditor.getSession().setMode("ace/mode/html");
                break;

            case 'js':
                this.aceEditor.getSession().setMode("ace/mode/javascript");
                break;

            case 'cs':
                this.aceEditor.getSession().setMode("ace/mode/csharp");
                break;

            case 'pwg':
                this.aceEditor.getSession().setMode("ace/mode/json");
                break;

            default:
                break;
        }
    }

    // Read the file
    private readFile(name: string): OpenedFile {
        var data = (<any>window).fs.readFileSync(Project.getSingleton().path + name).toString();
        var ext = name.slice(name.lastIndexOf('.') + 1, name.length)

        var file = new OpenedFile();
        file.name = name;
        file.ext = ext;
        file.data = data;
        return file;
    }

    // show file in editor
    private showFile(file: OpenedFile) {
        if (this.currentFile != null) {
            // Save the temp file
            this.openedFiles[this.currentFile.index].data = this.aceEditor.getValue();
            this.openedFiles$[this.currentFile.index].next(
                this.openedFiles[this.currentFile.index]
            );
        }
        this.currentFile = file;
        this.currentFile$.next(file);
        this.aceEditor.setValue(file.data);
        this.setCodeHighliting(file.ext);
    }

    // Open a file and show it in editor
    openFile(name: string) {
        this.isFileChanging = true;
        for (var i = 0; i < this.openedFiles.length; i++) {
            if (this.openedFiles[i].name == name) {
                // the file is opened already.
                this.showFile(this.openedFiles[i]);
                return;
            }
        }

        // Open the file
        var file = this.readFile(name);
        file.index = this.openedFiles.length;
        this.openedFiles.push(file);
        var of$ = new BehaviorSubject<OpenedFile>(file);
        this.openedFiles$.push(of$);
        this.showFile(file);
        this.openedFilesCount$.next(this.openedFiles$.length);
    }
}
