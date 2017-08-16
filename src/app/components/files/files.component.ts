import { element } from 'protractor';
import { EditorManager, OpenedFile } from './../../classes/editorManager';
import { Project } from './../../classes/project';
import { Component, OnInit } from '@angular/core';

class FileName {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  needSave = false;
  file: OpenedFile;
}

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  name: string;
  files = [new FileName('models.yaml'), new FileName ('controllers.yaml')];  

  constructor() { }

  ngOnInit() {
    EditorManager.getSingleton().listenOpenedFilesCount().subscribe(
      value => {
        if (value != 0) {
          this.listenForFile(value - 1);
        }
      }
    );
    setTimeout(() => {
      var proj = Project.getSingleton();
      this.name = proj.name;
      this.files.push(new FileName(this.name + '.pwg'));
    }, 100);
  }

  listenForFile(index: number) {
    EditorManager.getSingleton().getOpenedFile(index).subscribe(
      value => {
        for (var i = 0; i < this.files.length; i++) {
          var element = this.files[i];
          if (value.name == element.name) {
            element.needSave = !value.isSaved;
          }
        }
      }
    );         
  }

  open(filename: string) {
    EditorManager.getSingleton().openFile(filename);

  }
}
