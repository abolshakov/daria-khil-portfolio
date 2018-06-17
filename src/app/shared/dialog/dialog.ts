import { Component, HostListener, Inject, NgModule, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatSpinner } from '@angular/material';
import { MaterialAndFlexModule } from '../material-and-flex.module';

import { GalleryItems, GalleryItem } from '../gallery-items/gallery-items';
import { DialogData } from '../gallery/gallery';

@Component({
    selector: 'pfo-gallery-item-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit {
    @ViewChild('spinner') spinnerView: MatSpinner;
    @ViewChild('tempImage') tempImageView;
    @ViewChild('image') imageView;
    @ViewChild('actions') actionsView;

    public temporaryImage: String;
    public description: String;
    public previousDisabled: Boolean;
    public nextDisabled: Boolean;

    public current: GalleryItem;
    public previous: GalleryItem;
    public next: GalleryItem;

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private galleryItems: GalleryItems) {
        this.temporaryImage = data.tempImage;
        this.current = data.item;
        this.next = galleryItems.getNextProjectItem(this.current);
    }

    ngOnInit(): void {
        this.toggleSpinner(true);
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
        if (this.previousDisabled) {
            return;
        }
        this.setTempImage();
        this.toggleSpinner(true);

        this.next = this.current;
        this.current = this.previous;
        this.previous = this.galleryItems.getPreviousProjectItem(this.current);
    }

    onNextClick(): void {
        if (this.nextDisabled) {
            return;
        }
        this.setTempImage();
        this.toggleSpinner(true);

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

        this.toggleSpinner(false);

        this.actionsView.nativeElement.style.width = image.width + 'px';
    }

    private toggleSpinner(visible: boolean): void {
        this.spinnerView._elementRef.nativeElement.hidden = !visible;
        this.tempImageView.nativeElement.hidden = !visible;
        this.imageView.nativeElement.hidden = visible;

        this.description = visible ? 'Loading...' : this.current.description;
        this.previousDisabled = visible ? true : this.previous === undefined;
        this.nextDisabled = visible ? true : this.next === undefined;
    }

    private setTempImage(): void {
        this.tempImageView.nativeElement.width = this.imageView.nativeElement.width;
        this.temporaryImage = this.current.image;
    }
}

@NgModule({
    exports: [DialogComponent],
    imports: [CommonModule, MaterialAndFlexModule],
    declarations: [DialogComponent]
})
export class DialogModule { }
