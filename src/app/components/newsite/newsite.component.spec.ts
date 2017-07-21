/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewsiteComponent } from './newsite.component';

describe('NewsiteComponent', () => {
  let component: NewsiteComponent;
  let fixture: ComponentFixture<NewsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
