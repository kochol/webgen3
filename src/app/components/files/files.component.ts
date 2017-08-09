import { EditorManager, OpenedFile } from './../../classes/editorManager';
import { Project } from './../../classes/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  name: string;
  files = ['models.yaml', 'controllers.yaml'];  

  constructor() { }

  ngOnInit() {
    EditorManager.getSingleton().listenOpenedFilesCount().subscribe(
      value => {
        if (value != 0) {

        }
      }
    )
    setTimeout(() => {
      var proj = Project.getSingleton();
      this.name = proj.name;
      this.files.push(this.name + '.pwg');
    }, 100);
  }

  open(filename: string) {
    EditorManager.getSingleton().openFile(filename);

  }
}
