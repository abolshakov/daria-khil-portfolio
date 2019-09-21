import { AbstractMediaView } from '../abstract-media-view';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ElementRef, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { filter, map, takeUntil, tap, switchMap } from 'rxjs/operators';
import { ProjectItem } from '../../shared/gallery/project-item.model';
import { RateableSize } from '../../shared/masonry/rateable-size.model';
import { ShellService } from '../../layout/shell/shared/shell.service';
import { Size } from '../../shared/size-model';
import { fromEvent } from 'rxjs';

@Component({
    selector: 'pfo-image-view',
    templateUrl: './image-view.component.html',
    styleUrls: ['./image-view.component.scss'],
})
export class ImageViewComponent extends AbstractMediaView implements AfterViewInit {
    @ViewChild('image', { static: false }) imageRef: ElementRef<HTMLImageElement>;

    public readonly imageSource = new EventEmitter<string>(true);

    public get projectItem(): ProjectItem {
        return this.route.snapshot.data['projectItem'];
    }

    private get image(): HTMLImageElement {
        return this.imageRef.nativeElement;
    }

    constructor(
        shell: ShellService,
        route: ActivatedRoute,
        private renderer: Renderer2
    ) {
        super(shell, route);
        console.log('IMAGE VIEW CREATED');
    }

    public ngAfterViewInit() {
        this.route.params
            .pipe(
                takeUntil(this.unsubscribe),
                map(() => !this.projectItem.video && !!this.projectItem.image
                    ? this.projectItem.image
                    : '')
            )
            .subscribe(src => {
                console.log('IMAGE ROUTE CHANGED');
                if (!src) {
                    this.resizeImage(this.image, null);
                }
                this.imageSource.next(src);
            });

        fromEvent(this.image, 'load')
            .pipe(
                takeUntil(this.unsubscribe),
                tap(() => console.log('IMAGE LOADED')),
                switchMap(() => !this.projectItem.video && !!this.projectItem.image
                    ? this.maxVisibleSize
                    : null)
            )
            .subscribe(maxSize => this.resizeImage(this.image, maxSize));

        this.maxVisibleSize
            .pipe(
                takeUntil(this.unsubscribe),
                filter(() => !this.projectItem.video && !!this.projectItem.image),
                tap(() => console.log('IMAGE VIEW SIZE CHANGED')))
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
        console.log('RESIZE IMAGE');
        if (!maxVisibleSize) {
            this.renderer.setStyle(image, 'width', 0);
            this.renderer.setStyle(image, 'height', 0);
            return;
        }
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
