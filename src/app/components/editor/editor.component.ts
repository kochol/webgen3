import { EditorManager } from './../../classes/editorManager';
import { Project } from './../../classes/project';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') editorDiv;

  editorMan: EditorManager;

  constructor() {
    this.editorMan = EditorManager.getSingleton();
   }

  ngOnInit() {
    var langTools = ace.require("ace/ext/language_tools");
    this.editorMan.aceEditor = ace.edit(this.editorDiv.nativeElement);
    this.editorMan.aceEditor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    });
    
    langTools.addCompleter(this);

    this.editorMan.aceEditor.$blockScrolling = Infinity;
    this.editorMan.aceEditor.setTheme("ace/theme/monokai");
    this.editorMan.init();
  }

  getCompletions(editor, session, pos, prefix, callback) {
    callback(null, [
      {value: "int", meta: "type"},
      {value: "float", meta: "type"},
      {value: "double", meta: "type"},
      {value: "decimal", meta: "type"},
      {value: "string", meta: "type"},
      {value: "DateTime", meta: "type"},
      {value: "bool", meta: "type"}  
      ]);
  }
}
