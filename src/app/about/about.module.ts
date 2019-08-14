import { AboutComponent } from './about.component';
import { AutosizeModule } from 'ngx-autosize';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDividerModule } from '@angular/material';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    AutosizeModule,
    CommonModule,
    MaterialAndFlexModule,
    MatButtonModule,
    MatDividerModule
  ],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class AboutModule { }
