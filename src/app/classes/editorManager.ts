import { element } from 'protractor';
import { Project } from './project';
import { EditorComponent } from './../components/editor/editor.component';
import * as fs from 'fs';

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
    openedFiles: OpenedFile[] = [];
    currentFile: OpenedFile = null;

    // Get editor manager singlton object
    public static getSingleton(): EditorManager {
        if (this.editorMan)
            return this.editorMan;

        this.editorMan = new EditorManager();
        return this.editorMan;
    }

    // Init the events
    init() {
        this.aceEditor.getSession().on('change', e => {
            if (this.currentFile) {
                this.openedFiles[this.currentFile.index].isSaved = false;
            }
        });
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
        var data = fs.readFileSync(Project.getSingleton().path + name).toString();
        var ext = name.slice(name.lastIndexOf('.') + 1, name.length)
        
        var file = new OpenedFile();
        file.name = name;
        file.ext = ext;
        file.data = data;
        return file;
    }

    // show file in editor
    private showFile(file: OpenedFile) {
        if (this.currentFile != null)
            {
                // Save the temp file
                this.openedFiles[this.currentFile.index].data = this.aceEditor.getValue();
            }
        this.currentFile = file;
        this.aceEditor.setValue(file.data);
        this.setCodeHighliting(file.ext);
    }

    // Open a file and show it in editor
    openFile(name: string) {
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
        this.showFile(file);
    }
}
