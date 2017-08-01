import { Project } from './../../classes/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  name: string;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      var proj = Project.getSingleton();
      this.name = proj.name;
    }, 100);
  }

  open(filename: string) {
    console.log(filename);
  }
}
