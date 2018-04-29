import { TabButton } from './../tabMenu/tabMenu.component';
import { element } from 'protractor';
import { EditorManager, OpenedFile } from './../../classes/editorManager';
import { Router } from '@angular/router';
import { Project } from './../../classes/project';
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  items: TabButton[] = [];
  files: OpenedFile[] = [];
  lastItemIndex: number = -1;

  constructor(private router: Router, private confirmationService: ConfirmationService) { }

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
            this.files[i].isSaved = value.isSaved;
            this.items[i].isSaved = value.isSaved; 
            this.items[i].isVisible = true;
            this.items[i].isActive = true;
            if (this.lastItemIndex >= 0)
              this.items[this.lastItemIndex].isActive = false;
            this.lastItemIndex = i;
            break;
          }
        }
        if (element == null)
        {
          // New file opened we need to add it.
          this.files.push(value);
          this.items.push({label: value.name, icon: 'fa-file', isSaved: true
            , command: (event) => {
              EditorManager.getSingleton().openFile(event.item.label);
            }
            , closeCommand: (event) => {
              if (event.item.isSaved === false)
              {
                this.confirmationService.confirm({
                  message: 'Do you want to save?',
                  header: 'Confirmation',
                  icon: 'fa fa-question-circle',
                  accept: () => {
                    this.files.forEach(element => {
                      if (element.name == event.item.name)
                      {
                        EditorManager.getSingleton().SaveFile(element);                        
                      }
                    });
                    event.item.isVisible = false;
                  },
                  reject: () => {
                    return;
                  }
                });
              }
              else
                event.item.isVisible = false;
            }
          });
        }
      }
    );         
  }

}
