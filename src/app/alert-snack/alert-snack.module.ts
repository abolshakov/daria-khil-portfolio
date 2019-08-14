import { AlertSnackComponent } from './alert-snack.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  declarations: [AlertSnackComponent],
  exports: [AlertSnackComponent]
})
export class AlertSnackModule { }
