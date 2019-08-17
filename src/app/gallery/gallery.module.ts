import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [GalleryComponent],
    declarations: [GalleryComponent],
    imports: [CommonModule, MaterialAndFlexModule],
})
export class GalleryModule { }
