import { ElementInfo } from '../masonry/element-info.interface';
import { ImageInfo } from './image-info.model';
import { Injectable } from '@angular/core';
import { Size } from '../masonry/size.model';

@Injectable({ providedIn: 'root' })
export class ImageInfoService {
    public retrive(images: HTMLImageElement[]): ElementInfo[] {
        return images.map(x => new ImageInfo(this.imageSize(x), this.imageMargins(x)));
    }

    public update(images: HTMLImageElement[], info: ElementInfo[]) {
        images.forEach((image, i) => {
            const width = info[i].width;
            const height = info[i].height;
            if (width > height) {
                image.setAttribute('width', width.toString());
            } else {
                image.setAttribute('height', height.toString());
            }
        });
    }

    private imageSize(image: HTMLImageElement): Size {
        return new Size(image.naturalWidth, image.naturalHeight);
    }

    private imageMargins(image: HTMLImageElement): Size {
        const style = window.getComputedStyle(image);
        const width = Number.parseFloat(style.marginLeft) + Number.parseFloat(style.marginRight);
        const height = Number.parseFloat(style.marginTop) + Number.parseFloat(style.marginBottom);
        return new Size(width, height);
    }
}
