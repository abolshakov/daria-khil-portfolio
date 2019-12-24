import { ElementInfo } from '../masonry/element-info.interface';
import { HtmlHelper } from '../html-helper';
import { ImageInfo } from './image-info.model';
import { Injectable } from '@angular/core';
import { RateableSize } from '../masonry/rateable-size.model';

@Injectable({ providedIn: 'root' })
export class ImageInfoService {
    public retrive(images: HTMLImageElement[]): ElementInfo[] {
        return images.map(x => new ImageInfo(this.imageSize(x), this.imageMargins(x)));
    }

    public update(images: HTMLImageElement[], info: ElementInfo[]) {
        images.forEach((image, i) => {
            image.removeAttribute('width');
            image.removeAttribute('height');

            const width = info[i].width;
            const height = info[i].height;

            image.setAttribute('width', Math.floor(width).toString());
            image.setAttribute('height', Math.floor(height).toString());
        });
    }

    private imageSize(image: HTMLImageElement): RateableSize {
        return new RateableSize(image.width, image.height);
    }

    private imageMargins(image: HTMLImageElement): RateableSize {
        const margins = HtmlHelper.margins(image);
        return new RateableSize(margins.width, margins.height);
    }
}
