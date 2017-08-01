import { Component, OnInit } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  name = "editor";
  title = 'hghfdg';
  constructor() {this.name="test"; }

  ngOnInit() {
    var editor = ace.edit(this.name);
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/yaml");

  }

}
