import { CommonModule } from '@angular/common';
import { MaterialAndFlexModule } from '../../shared/material-and-flex.module';
import { NgModule } from '@angular/core';
import { VideoViewComponent } from './video-view.component';

@NgModule({
    exports: [VideoViewComponent],
    imports: [
        CommonModule,
        MaterialAndFlexModule
    ],
    declarations: [VideoViewComponent]
})
export class VideoViewModule { }
