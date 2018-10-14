import { Component, HostListener, Inject, NgModule, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatSpinner } from '@angular/material';
import { MaterialAndFlexModule } from '../material-and-flex.module';

import { GalleryItems, GalleryItem } from '../gallery-items/gallery-items';
import { DialogData } from '../gallery/gallery';

import { ImageCardComponent } from '../image-card/image-card';

@Component({
    selector: 'pfo-gallery-item-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements AfterViewInit {
    // @ViewChild('spinner') spinnerView: MatSpinner;
    @ViewChild('visibleArea') visibleArea;

    public rootItem: GalleryItem;
    public items: GalleryItem[] = [];
    public visibleWidth: number;
    public visibleHeight: number;

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private galleryItems: GalleryItems) {
        this.rootItem = data.item;
        let current: GalleryItem = this.rootItem;
        while (current = galleryItems.getNextProjectItem(current)) {
            this.items.push(current);
        }
    }

    ngAfterViewInit(): void {
        // this.toggleSpinner(true);
        this.dialogRef.updateSize('80%', '80%');
        Promise.resolve(null).then(() =>
            this.calculateSize(this.visibleArea.nativeElement));
    }

    @HostListener('window:resize')
    onResize() {
        this.calculateSize(this.visibleArea.nativeElement);
    }

    private calculateSize(element: HTMLElement): void {
        const style: CSSStyleDeclaration = window.getComputedStyle(element);
        const horizontalPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        const verticalPadding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        this.visibleWidth = element.clientWidth - horizontalPadding;
        this.visibleHeight = element.clientHeight - verticalPadding;
    }

    // private toggleSpinner(visible: boolean): void {
    //     this.show(this.spinnerView._elementRef.nativeElement, visible);
    //     this.show(this.tempImageView.nativeElement, visible);
    //     this.show(this.imageList.nativeElement, !visible);
    // }

    // private show(nativeElement: any, visible: boolean): void {
    //     if (visible) {
    //         nativeElement.removeAttribute('hidden');
    //     } else {
    //         nativeElement.hidden = true;
    //     }
    // }
}

@NgModule({
    exports: [DialogComponent],
    imports: [CommonModule, MaterialAndFlexModule],
    declarations: [DialogComponent,
        ImageCardComponent]
})
export class DialogModule { }
