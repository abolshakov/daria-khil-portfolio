import { CommonModule } from '@angular/common';
import { ImageCardModule } from '../image-card/image-card.module';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';
import { ProjectComponent } from './project.component';

@NgModule({
    exports: [ProjectComponent],
    imports: [
        CommonModule,
        ImageCardModule,
        MaterialAndFlexModule
    ],
    declarations: [ProjectComponent]
})
export class ProjectModule { }
