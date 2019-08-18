import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';
import { ProjectModule } from '../project/project.module';

@NgModule({
    exports: [GalleryComponent],
    declarations: [GalleryComponent],
    imports: [
        CommonModule,
        MaterialAndFlexModule,
        ProjectModule],
})
export class GalleryModule { }
