import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { ImageViewModule } from '../media-view/image-view/image-view.module';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';
import { ProjectItemModule } from '../project-item/project-item.module';
import { ProjectModule } from '../project/project.module';
import { VideoViewModule } from '../media-view/video-view/video-view.module';

@NgModule({
    exports: [GalleryComponent],
    declarations: [GalleryComponent],
    imports: [
        CommonModule,
        MaterialAndFlexModule,
        ProjectModule,
        ProjectItemModule,
        ImageViewModule,
        VideoViewModule
    ],
})
export class GalleryModule { }
