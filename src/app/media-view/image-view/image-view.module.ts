import { CommonModule } from '@angular/common';
import { MaterialAndFlexModule } from '../../material-and-flex.module';
import { NgModule } from '@angular/core';
import { ImageViewComponent } from './image-view.component';

@NgModule({
    exports: [ImageViewComponent],
    imports: [
        CommonModule,
        MaterialAndFlexModule
    ],
    declarations: [ImageViewComponent]
})
export class ImageViewModule { }
