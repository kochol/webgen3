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
    this.editorMan.aceEditor = ace.edit(this.editorDiv.nativeElement);
    this.editorMan.aceEditor.$blockScrolling = Infinity;
    this.editorMan.aceEditor.setTheme("ace/theme/monokai");
    this.editorMan.init();
  }

}
