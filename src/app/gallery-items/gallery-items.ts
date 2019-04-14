import { Injectable } from '@angular/core';
import { PREVIEW_ITEMS } from './preview-items';

export interface PreviewItem {
    title?: string;
    image?: string;
    description?: string;
    portfolioItems?: PortfolioItem[];
}

export interface PortfolioItem {
    image?: string;
    description?: string;
    url?: string;
    video?: string;
}

@Injectable()
export class GalleryItems {
    private readonly imagesPath = '../assets/images/';

    constructor() {
        for (const previewItem of PREVIEW_ITEMS as PreviewItem[]) {
            if (previewItem.image) {
                previewItem.image = this.imagesPath + previewItem.image;
            }

            if (!previewItem.portfolioItems) {
                continue;
            }

            for (const portfolioItem of previewItem.portfolioItems) {
                if (portfolioItem.image) {
                    portfolioItem.image = this.imagesPath + portfolioItem.image;
                }
            }
        }
    }

    getPreviewItems(): PreviewItem[] {
        return PREVIEW_ITEMS;
    }
}
