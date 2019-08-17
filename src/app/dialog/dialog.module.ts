import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { ImageCardComponent } from '../image-card/image-card.component';

@NgModule({
    exports: [DialogComponent],
    imports: [
        CommonModule,
        MaterialAndFlexModule],
    declarations: [
        DialogComponent,
        ImageCardComponent
    ]
})
export class DialogModule { }
