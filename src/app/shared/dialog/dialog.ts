import { Component, HostListener, Inject, NgModule, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatRippleModule } from '@angular/material';

import { GalleryItems, GalleryItem } from '../gallery-items/gallery-items';

@Component({
    selector: 'pfo-gallery-item-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit {
    @ViewChild('image') imageView;
    @ViewChild('actions') actionsView;

    public current: GalleryItem;
    public previous: GalleryItem;
    public next: GalleryItem;

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: GalleryItem,
        private galleryItems: GalleryItems) {
        this.current = data;
        this.next = galleryItems.getNextProjectItem(this.current);
    }

    ngOnInit(): void {
        this.resizeImage();
    }

    @HostListener('window:resize')
    onResize() {
        this.resizeImage();
    }

    onImageLoad(): void {
        this.resizeImage();
    }

    onPreviousClick(): void {
        if (!this.previous) {
            return;
        }
        this.next = this.current;
        this.current = this.previous;
        this.previous = this.galleryItems.getPreviousProjectItem(this.current);
    }

    onNextClick(): void {
        if (!this.next) {
            return;
        }
        this.previous = this.current;
        this.current = this.next;
        this.next = this.galleryItems.getNextProjectItem(this.current);
    }

    onContentClick(): void {
        if (!this.current.url) {
            return;
        }
        const win = window.open(this.current.url, '_blank');
        win.focus();
    }

    private resizeImage(): void {
        const image: HTMLImageElement = this.imageView.nativeElement;

        if (!image.complete) {
            return;
        }

        const scaleFactor = 0.7;

        const imageWidth: number = image.naturalWidth;
        const imageHeight: number = image.naturalHeight;

        const windowWidth: number = window.innerWidth * scaleFactor;
        const windowHeight: number = window.innerHeight * scaleFactor;

        const deltaWidth: number = (imageWidth - windowWidth) / imageWidth;
        const deltaHeight: number = (imageHeight - windowHeight) / imageHeight;

        if (deltaWidth > 0 && deltaWidth > deltaHeight) {
            image.removeAttribute('height');
            image.width = windowWidth;
        } else
            if (deltaHeight > 0 && deltaHeight >= deltaWidth) {
                image.removeAttribute('width');
                image.height = windowHeight;
            } else {
                image.removeAttribute('width');
                image.removeAttribute('height');
            }

        const actions: HTMLElement = this.actionsView.nativeElement;
        actions.style.width = image.width + 'px';
    }
}

@NgModule({
    exports: [DialogComponent],
    imports: [CommonModule, MatRippleModule],
    declarations: [DialogComponent]
})
export class DialogModule { }
