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
  items: MenuItem[];
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
    if (!Project.getSingleton().isProjectLoaded)
      if (!Project.getSingleton().openLastProject())
        this.router.navigate(['/']);      
    }, 100);
    this.items = [
      {label: 'Stats', icon: 'fa-bar-chart'},
      {label: 'Calendar', icon: 'fa-calendar'},
      {label: 'Documentation', icon: 'fa-book'},
      {label: 'Support', icon: 'fa-support'},
      {label: 'Social', icon: 'fa-twitter'}
  ];
  }

}
