import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from './dialog/dialog';
import { DialogModule } from './dialog/dialog.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialAndFlexModule } from './shared/material-and-flex.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellModule } from './shell/shell.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DialogModule,
    HttpClientModule,
    MaterialAndFlexModule,
    RouterModule,
    ShellModule
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
