import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule } from '@angular/material';
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
        MatInputModule],
    exports: [
        FlexLayoutModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule],
  })
  export class MaterialAndFlexModule { }
