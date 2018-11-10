import { Component, Input, ViewChild, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { PortfolioItem } from '../gallery-items/gallery-items';

interface Size {
    width: number;
    height: number;
}

@Component({
    selector: 'pfo-image-card',
    templateUrl: './image-card.html',
    styleUrls: ['./image-card.scss']
})
export class ImageCardComponent implements OnInit, OnChanges {
    @Input()
    public item: PortfolioItem;
    @Input()
    public maxWidth: number;
    @Input()
    public maxHeight: number;

    private cssClass: any;

    @ViewChild('image') imageView;
    @ViewChild('subtitle') subtitleView;

    ngOnInit(): void{
        this.cssClass = {
            "image": true,
            "clickable": this.item.url != null
        }
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
        if (changes['maxWidth'] || changes['maxHeight']) {
            this.resizeImage(this.imageView.nativeElement);
        }
    }

    onImageLoad(): void {
        this.resizeImage(this.imageView.nativeElement);
    }

    private resizeImage(image: HTMLImageElement): void {
        if (!image.complete) {
            return;
        }

        const imageWidth: number = image.naturalWidth;
        const imageHeight: number = image.naturalHeight;

        const subtitleHeight = this.getSubtitleHeight();

        const contentWidth: number = this.maxWidth;
        const contentHeight: number = this.maxHeight - subtitleHeight;

        const deltaWidth: number = (imageWidth - contentWidth) / imageWidth;
        const deltaHeight: number = (imageHeight - contentHeight) / imageHeight;

        if (deltaWidth > 0 && deltaWidth > deltaHeight) {
            image.removeAttribute('height');
            image.width = contentWidth;
        } else
            if (deltaHeight > 0 && deltaHeight >= deltaWidth) {
                image.removeAttribute('width');
                image.height = contentHeight;
            } else {
                image.removeAttribute('width');
                image.removeAttribute('height');
            }
    }

    private getSubtitleHeight(): number {
        const element: HTMLElement = this.subtitleView.nativeElement;
        const style: CSSStyleDeclaration = window.getComputedStyle(element);
        const verticalMargin = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        return element.clientHeight + verticalMargin;
    }

    onContentClick(): void {
        if (!this.item.url) {
            return;
        }
        const win = window.open(this.item.url, '_blank');
        win.focus();
    }
}
