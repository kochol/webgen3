import { element } from 'protractor';
import { EditorManager, OpenedFile } from './../../classes/editorManager';
import { Router } from '@angular/router';
import { Project } from './../../classes/project';
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  items: MenuItem[] = [];
  files: OpenedFile[] = [];
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
    if (!Project.getSingleton().isProjectLoaded)
      if (!Project.getSingleton().openLastProject())
        this.router.navigate(['/']);      
    }, 100);
    EditorManager.getSingleton().listenOpenedFilesCount().subscribe(
      value => {
        if (value != 0) {
          this.listenForFile(value - 1);
        }
      } 
    );
  }

  listenForFile(index: number) {
    EditorManager.getSingleton().getOpenedFile(index).subscribe(
      value => {
        var element = null;
        for (var i = 0; i < this.files.length; i++) {          
          if (value.name == this.files[i].name) {
            element = this.files[i];
            element.isSaved = value.isSaved;
          }
        }
        if (element == null)
        {
          // New file opened we need to add it.
          this.files.push(value);
          this.items.push({label: value.name, icon: 'fa-file'});
        }
      }
    );         
  }

}
