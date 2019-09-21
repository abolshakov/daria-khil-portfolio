import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { EmbedVideoService } from '../shared/embed-video.service/embed-video.service';
import { ProjectItem } from '../shared/gallery/project-item.model';

interface Margins {
    top: number;
    rigth: number;
    bottom: number;
    left: number;
    vertical: number;
    horizontal: number;
}

@Component({
    selector: 'pfo-image-card',
    templateUrl: './image-card.component.html',
    styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit, OnChanges {
    private _margins: Margins;

    private get itemMargins(): Margins {
        if (!this._margins) {
            const margins = !this.item.margin
                ? [0, 0, 0, 0]
                : this.item.margin.split(' ').map(s => Number(s));
            this._margins = {
                top: margins[0],
                rigth: margins[1],
                bottom: margins[2],
                left: margins[3],
                vertical: margins[0] + margins[2],
                horizontal: margins[1] + margins[3]
            };
        }
        return this._margins;
    }
    @Input() public item: ProjectItem;
    @Input() public maxWidth: number;
    @Input() public maxHeight: number;

    @ViewChild('image', { static: false }) public imageView: ElementRef<HTMLImageElement>;
    @ViewChild('subtitle', { static: false }) public subtitleView: ElementRef<HTMLImageElement>;

    public cssClass: any;

    public get descriptionLines(): string[] {
        return this.item.description
            ? this.item.description.split(' \n')
            : [];
    }

    public get videoHtml(): any {
        return this.item.video
            ? this.video.embed(this.item.video, {
                attr: {
                    width: this.maxWidth - this.itemMargins.horizontal,
                    height: Math.min(this.maxWidth / (16 / 9), this.maxHeight) - this.itemMargins.vertical
                }
            })
            : null;
    }

    constructor(private video: EmbedVideoService) { }

    ngOnInit(): void {
        this.cssClass = {
            'image': true,
            'clickable': this.item.url != null
        };
        if (this.item.description) {
            this.item.description.replace('\n', '</br>');
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

        const contentWidth: number = this.maxWidth - this.itemMargins.horizontal;
        const contentHeight: number = this.maxHeight - subtitleHeight - this.itemMargins.vertical;

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
        const m = this.itemMargins;
        image.style.margin = [m.top, m.rigth, m.bottom, m.left].join('px ') + 'px';
    }

    private getSubtitleHeight(): number {
        if (!this.subtitleView) {
            return 0;
        }
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
