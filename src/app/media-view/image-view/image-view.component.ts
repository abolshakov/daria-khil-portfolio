import { AbstractMediaView } from '../abstract-media-view';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ElementRef, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { RateableSize } from '../../shared/masonry/rateable-size.model';
import { ShellService } from '../../layout/shell/shared/shell.service';
import { Size } from '../../shared/size-model';
import { switchMap, takeUntil, tap, take } from 'rxjs/operators';

@Component({
    selector: 'pfo-image-view',
    templateUrl: './image-view.component.html',
    styleUrls: ['./image-view.component.scss'],
})
export class ImageViewComponent extends AbstractMediaView implements AfterViewInit {
    @ViewChild('image', { static: false }) imageRef: ElementRef<HTMLImageElement>;

    public readonly imageSource = new EventEmitter<string>(true);

    private get image(): HTMLImageElement {
        return this.imageRef.nativeElement;
    }

    constructor(
        shell: ShellService,
        route: ActivatedRoute,
        private renderer: Renderer2
    ) {
        super(shell, route);
    }

    public ngAfterViewInit() {
        this.route.params
            .pipe(
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.imageSource.next(this.projectItem.image);
            });

        fromEvent(this.image, 'load')
            .pipe(
                takeUntil(this.unsubscribe),
                switchMap(() => this.maxVisibleSize.pipe(take(1)))
            )
            .subscribe(maxSize => this.resizeImage(this.image, maxSize));

        this.maxVisibleSize
            .pipe(
                takeUntil(this.unsubscribe)
            )
            .subscribe(size => this.resizeImage(this.image, size));
    }

    public onContentClick(): void {
        if (!this.projectItem.url) {
            return;
        }
        const win = window.open(this.projectItem.url, '_blank');
        win.focus();
    }

    private resizeImage(image: HTMLImageElement, maxVisibleSize: Size) {
        const size = this.imageSize(image, maxVisibleSize);
        this.renderer.setStyle(image, 'width', size.width + 'px');
        this.renderer.setStyle(image, 'height', size.height + 'px');
    }

    private imageSize(image: HTMLImageElement, maxVisibleSize: Size): Size {
        const rateable = new RateableSize(image.naturalWidth, image.naturalHeight);
        const size = new Size(
            Math.min(image.naturalWidth, maxVisibleSize.width),
            Math.min(image.naturalHeight, maxVisibleSize.height)
        );
        return this.fitSize(size, rateable);
    }
}
