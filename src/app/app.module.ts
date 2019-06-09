import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from './dialog/dialog';
import { DialogModule } from './dialog/dialog.module';
import { GalleryModule } from './gallery/gallery';
import { HttpClientModule } from '@angular/common/http';
import { MaterialAndFlexModule } from './shared/material-and-flex.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DialogModule,
    GalleryModule,
    HttpClientModule,
    MaterialAndFlexModule
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
