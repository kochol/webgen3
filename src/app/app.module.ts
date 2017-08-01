import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdInputModule, MdButtonModule, MdIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { DclWrapper } from './components/dclwrapper';
import { NewsiteComponent } from './components/newsite/newsite.component';
import { IdeComponent } from './components/ide/ide.component';
import { FilesComponent } from './components/files/files.component';
import { EditorComponent } from './components/editor/editor.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    DclWrapper,
    NewsiteComponent,
    IdeComponent,
    FilesComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule
  ],
  entryComponents: [
    NewsiteComponent
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
