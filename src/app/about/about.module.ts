import { AboutComponent } from './about.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDividerModule } from '@angular/material';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    MaterialAndFlexModule,
    MatButtonModule,
    MatDividerModule
  ],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class AboutModule { }
