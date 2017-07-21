import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-newsite',
  templateUrl: './newsite.component.html',
  styleUrls: ['./newsite.component.scss']
})
export class NewsiteComponent implements OnInit {

  @ViewChild('folderDialog') folderDialog;  
  path: string = "C:\\";
  name: string;

  constructor() { }

  ngOnInit() {
    var lastFolder = localStorage.getItem('LastFolder');
    if (lastFolder) {
      this.path = lastFolder;
    }
  }

  browse() {
    this.folderDialog.nativeElement.click();
  }

  folderSelect(fileInput: any) {
    console.debug(fileInput.target.files);
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.path = fileInput.target.files[0].path;
      localStorage.setItem('LastFolder', this.path);
    }
  }

  create() {
    
  }

}