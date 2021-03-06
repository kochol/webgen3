import { DclWrapper } from './../dclwrapper';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Type } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('myModal') myModal;
  @ViewChild(DclWrapper) dcl: DclWrapper;
  
  modalInnerHtml: string = '';

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      if (event.target == this.myModal.nativeElement) {
        this.myModal.nativeElement.style.display = "none";
      }
    }

  }

  show() {
    this.myModal.nativeElement.style.display = "block";
  }

  hide() {
    this.myModal.nativeElement.style.display = "none";
  }

  setInnerHtml(html: string) {
    this.modalInnerHtml = html;
    this.changeRef.detectChanges();
  }

  setComponent(type: any) {
    this.dcl.type = type;
    this.dcl.updateComponent();
  }
}
