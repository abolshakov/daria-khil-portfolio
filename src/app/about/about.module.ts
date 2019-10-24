import { AboutComponent } from './about.component';
import { AutosizeModule } from 'ngx-autosize';
import { CommonModule } from '@angular/common';
import { DirecivesModule } from '../ng-directives/directives.module';
import { MatButtonModule, MatDividerModule } from '@angular/material';
import { MaterialAndFlexModule } from '../material-and-flex.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    AutosizeModule,
    CommonModule,
    DirecivesModule,
    MaterialAndFlexModule,
    MatButtonModule,
    MatDividerModule
  ],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class AboutModule { }
