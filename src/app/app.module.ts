import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DirecivesModule } from './ng-directives/directives.module';
import { GtagService, initGtagService } from './shared/tracking/gtag.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialAndFlexModule } from './material-and-flex.module';
import { MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ShellModule } from './layout/shell/shell.module';
import { TrackingService } from './shared/tracking/tracking.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DirecivesModule,
    HttpClientModule,
    MaterialAndFlexModule,
    MatSnackBarModule,
    RouterModule,
    ShellModule
  ],
  providers: [
    GtagService,
    TrackingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initGtagService,
      deps: [GtagService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
