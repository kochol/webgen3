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

  constructor() { }

  ngOnInit() {
  }

  newDialog() {
    this.modal.show();
    this.modal.setComponent(NewsiteComponent);
  }

}
