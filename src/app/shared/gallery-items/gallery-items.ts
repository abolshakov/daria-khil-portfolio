import { Injectable } from '@angular/core';

import { PREVIEW_ITEMS } from './preview-items';
import { PROJECT_ITEMS } from './project-items';

export interface GalleryItem {
    image: string;
    title?: string;
    description: string;
    url?: string;
    linked?: string;
}

@Injectable()
export class GalleryItems {
    private readonly previewPath = '../assets/images/preview/';
    private readonly projectPath = '../assets/images/projects/';

    private forwardLinkedList: Map<string, GalleryItem> = new Map<string, GalleryItem>();
    private backwardLinkedList: Map<string, GalleryItem> = new Map<string, GalleryItem>();

    constructor() {
        for (const item of PREVIEW_ITEMS) {
            item.image = this.previewPath + item.image;

            if (item.linked) {
                item.linked = this.projectPath + item.linked;
            }
        }
        for (const item of PROJECT_ITEMS) {
            item.image = this.projectPath + item.image;
            this.forwardLinkedList.set(item.image, item);

            if (item.linked) {
                item.linked = this.projectPath + item.linked;
                this.backwardLinkedList.set(item.linked, item);
            }
        }
    }

    getPreviewItems(): GalleryItem[] {
        return PREVIEW_ITEMS;
    }

    getNextProjectItem(item: GalleryItem): GalleryItem {
        return this.forwardLinkedList.get(item.linked);
    }

    getPreviousProjectItem(item: GalleryItem): GalleryItem {
        return this.backwardLinkedList.get(item.image);
    }
}
