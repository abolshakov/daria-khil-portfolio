import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChange,
    ViewChild
    } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from '../shared/embed-video.service/embed-video.service';
import { PortfolioItem } from '../gallery-items/gallery-items';

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

    public cssClass: any;

    public get videoHtml(): any {
        return this.item.video
            ? this.video.embed(this.item.video, { attr: { width: this.maxWidth, height: this.maxWidth / (16 / 9) } })
            : null;
    }

    @ViewChild('image') imageView: { nativeElement: HTMLImageElement; };
    @ViewChild('subtitle') subtitleView: { nativeElement: HTMLElement; };

    constructor(private sanitizer: DomSanitizer, private video: EmbedVideoService) { }

    ngOnInit(): void {
        this.cssClass = {
            "image": true,
            "clickable": this.item.url != null
        }
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
        if (this.imageView && (changes['maxWidth'] || changes['maxHeight'])) {
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
