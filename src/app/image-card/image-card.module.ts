import { CommonModule } from '@angular/common';
import { ImageCardComponent } from './image-card.component';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [ImageCardComponent],
    imports: [CommonModule],
    declarations: [ImageCardComponent],
})
export class ImageCardModule { }
