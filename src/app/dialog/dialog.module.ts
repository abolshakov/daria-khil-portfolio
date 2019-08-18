import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';

@NgModule({
    exports: [DialogComponent],
    imports: [
        CommonModule,
        MaterialAndFlexModule],
    declarations: [DialogComponent]
})
export class DialogModule { }
