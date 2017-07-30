import { Router } from '@angular/router';
import { Project } from './../../classes/project';
import { NewsiteComponent } from './../newsite/newsite.component';
import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit, ViewChild, Type } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('openDialog') openDialog;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newDialog() {
    this.modal.show();
    this.modal.setComponent(NewsiteComponent);
  }

  openProject() {
    this.openDialog.nativeElement.click();
  }

  fileSelect(event: any) {
<<<<<<< HEAD
    const fileInput = <HTMLInputElement>event.target;
    Project.getSingleton().openProject(fileInput.files[0].path);
=======
    var fileInput = <HTMLInputElement>event.target;
    if (Project.getSingleton().openProject(fileInput.files[0].path))
    {
      this.router.navigate(['ide']);
    }
>>>>>>> a42ee7101d163cba90ba45973e50d6cd615b2b06
  }
}
