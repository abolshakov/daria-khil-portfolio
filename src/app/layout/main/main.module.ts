import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MaterialAndFlexModule } from '../../material-and-flex.module';
import { MatRippleModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [MainComponent],
    declarations: [MainComponent],
    imports: [
        CommonModule,
        MaterialAndFlexModule,
        MatRippleModule,
        RouterModule
    ]
})
export class MainModule { }
