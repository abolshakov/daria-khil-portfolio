import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from './dialog/dialog.component';
import { DialogModule } from './dialog/dialog.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialAndFlexModule } from './shared/material-and-flex.module';
import { MatSnackBarModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellModule } from './shell/shell.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DialogModule,
    HttpClientModule,
    MaterialAndFlexModule,
    MatSnackBarModule,
    RouterModule,
    ShellModule
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
