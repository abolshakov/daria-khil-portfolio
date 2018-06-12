import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GalleryModule } from './shared/gallery/gallery';
import { MaterialAndFlexModule } from './shared/material-and-flex.module';
import { DialogModule, DialogComponent } from './shared/dialog/dialog';
import { Dir } from '@angular/cdk/bidi';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GalleryModule,
    DialogModule,
    MaterialAndFlexModule
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
