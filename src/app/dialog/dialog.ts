import {
    AfterViewInit,
    Component,
    HostListener,
    Inject,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DialogData } from '../gallery/gallery';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PreviewItem } from '../gallery-items/gallery-items';

@Component({
    selector: 'pfo-gallery-item-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements AfterViewInit {
    @ViewChild('visibleArea', { static: true }) visibleArea: { nativeElement: HTMLElement; };

    public previewItem: PreviewItem;
    public visibleWidth: number;
    public visibleHeight: number;

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.previewItem = data.item;
    }

    ngAfterViewInit(): void {
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
}
