import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule } from '@angular/material';
import { FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule],
    exports: [
        FlexLayoutModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule],
  })
  export class MaterialAndFlexModule { }
