import { CommonModule } from '@angular/common';
import { ImageViewModule } from '../media-view/image-view/image-view.module';
import { MaterialAndFlexModule } from '../material-and-flex.module';
import { NgModule } from '@angular/core';
import { ProjectItemComponent } from './project-item.component';
import { RouterModule } from '@angular/router';
import { VideoViewModule } from '../media-view/video-view/video-view.module';

@NgModule({
    exports: [ProjectItemComponent],
    imports: [
        CommonModule,
        MaterialAndFlexModule,
        RouterModule,
        ImageViewModule,
        VideoViewModule
    ],
    declarations: [ProjectItemComponent]
})
export class ProjectItemModule { }
