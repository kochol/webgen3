import { Router } from '@angular/router';
import { Project } from './../../classes/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
    if (!Project.getSingleton().isProjectLoaded)
      if (!Project.getSingleton().openLastProject())
        this.router.navigate(['/']);      
    }, 100);
  }

}
