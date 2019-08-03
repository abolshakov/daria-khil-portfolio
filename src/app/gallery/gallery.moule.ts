import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery';
import { GalleryItems } from '../gallery-items/gallery-items';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [GalleryComponent],
    declarations: [GalleryComponent],
    imports: [CommonModule, MaterialAndFlexModule],
    providers: [GalleryItems]
})
export class GalleryModule { }
