import { Project } from './../../classes/project';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as fs from 'fs';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') editorDiv;

  @Input() set file(name: string) {
    setTimeout(() => {
      this.aceEditor.setValue(fs.readFileSync(Project.getSingleton().path + name).toString());
      var ext = name.slice(name.lastIndexOf('.') + 1, name.length)
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
    }, 100);
  }
  aceEditor: any;

  constructor() { }

  ngOnInit() {
    this.aceEditor = ace.edit(this.editorDiv.nativeElement);
    this.aceEditor.setTheme("ace/theme/monokai");
  }

}
