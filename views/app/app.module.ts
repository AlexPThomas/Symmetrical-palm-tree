import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {MdButtonModule, MdCheckboxModule, MdCardModule,MdProgressSpinnerModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent }  from './app.component.js';
import {LoaderComponent} from './loader.component.js'
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule,
                  MdButtonModule, MdCheckboxModule,MdCardModule, BrowserAnimationsModule,MdProgressSpinnerModule],
  declarations: [ AppComponent,LoaderComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
