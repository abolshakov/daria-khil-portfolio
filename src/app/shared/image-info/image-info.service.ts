import { ElementInfo } from '../masonry/element-info.interface';
import { ImageInfo } from './image-info.model';
import { Injectable } from '@angular/core';
import { RateableSize } from '../masonry/rateable-size.model';
import { HtmlHelper } from '../html.helper';

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

    private imageSize(image: HTMLImageElement): RateableSize {
        return new RateableSize(image.naturalWidth, image.naturalHeight);
    }

    private imageMargins(image: HTMLImageElement): RateableSize {
        const margins = HtmlHelper.margins(image);
        return new RateableSize(margins.width, margins.height);
    }
}
