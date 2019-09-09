import { CommonModule } from '@angular/common';
import { ImageCardModule } from '../image-card/image-card.module';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';
import { ProjectItemComponent } from './project-item.component';

@NgModule({
    exports: [ProjectItemComponent],
    imports: [
        CommonModule,
        ImageCardModule,
        MaterialAndFlexModule
    ],
    declarations: [ProjectItemComponent]
})
export class ProjectItemModule { }
