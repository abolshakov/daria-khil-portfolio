import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EmbedVideoService } from '../shared/embed-video.service/embed-video.service';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { HeaderService } from '../layout/header/shared/header.service';
import { HtmlHelper } from '../shared/html.helper';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { Project, ProjectItem } from '../shared/gallery/gallery.service';
import { RateableSize } from '../shared/masonry/rateable-size.model';
import { SafeHtml } from '@angular/platform-browser';
import { ShellService } from '../layout/shell/shared/shell.service';
import { Size } from '../shared/size-model';
import { Unsubscribable } from '../shared/unsubscribable';

@Component({
    selector: 'pfo-project-item',
    templateUrl: './project-item.component.html',
    styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent extends Unsubscribable implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('container', { static: false }) containerRef: ElementRef<HTMLElement>;
    @ViewChild('image', { static: false }) imageRef: ElementRef<HTMLImageElement>;
    @ViewChild('video', { static: false }) videoRef: ElementRef<HTMLElement>;

    private subscribtion: Subscription;
    private _prev?: number;
    private _next?: number;

    public videoHtml: SafeHtml;

    public get project(): Project {
        return this.route.snapshot.data['project'];
    }

    public get projectItem(): ProjectItem {
        return this.route.snapshot.data['projectItem'];
    }

    public get imageSource(): string {
        return this.projectItem.image;
    }

    public get prev(): number {
        return this._prev;
    }

    public get next(): number {
        return this._next;
    }

    private get video(): HTMLElement {
        return this.videoRef.nativeElement;
    }

    private get image(): HTMLImageElement {
        return this.imageRef.nativeElement;
    }

    private get maxVisibleSize(): Observable<Size> {
        return this.shell.maxVisibleSize.pipe(
            map(value => {
                const margins = HtmlHelper.margins(this.containerRef.nativeElement);
                return new Size(value.width - margins.width, value.height - margins.height);
            })
        );
    }

    constructor(
        private activatedRote: ActivatedRoute,
        private header: HeaderService,
        private shell: ShellService,
        private route: ActivatedRoute,
        private renderer: Renderer2,
        private router: Router,
        private videoService: EmbedVideoService
    ) {
        super();
    }

    public ngOnInit() {
        this.subscribtion = this.activatedRote.params.subscribe(() => {
            if (this.subscribtion) {
                console.log('ON INIT');
                this.unsubscribe.next();
                this.initialize();
                this.subscribe();
            }
        });
        this.initialize();
    }

    public ngAfterViewInit() {
        this.subscribe();
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.subscribtion.unsubscribe();
        this.header.titleProvider = null;
        this.header.subtitleProvider = null;
    }

    public onContentClick(): void {
        if (!this.projectItem.url) {
            return;
        }
        const win = window.open(this.projectItem.url, '_blank');
        win.focus();
    }

    public openProjectItem(projectItemIndex: number): void {
        if (projectItemIndex < 0 || projectItemIndex >= this.project.items.length) {
            return;
        }
        const itemId = this.project.items[projectItemIndex].id;
        const url = this.router.url.replace(`/${this.projectItem.id}`, `/${itemId}`);
        this.router.navigate([url], { replaceUrl: true });
    }

    private initialize() {
        this.header.titleProvider = of(this.project.title);
        this.header.subtitleProvider = of(this.projectItem.description);

        this.videoHtml = this.projectItem.video
            ? this.videoService.embed(this.projectItem.video)
            : null;

        const ids = this.project.items.map(x => x.id);
        const index = ids.indexOf(this.projectItem.id);
        this._prev = index > 0 ? index - 1 : null;
        this._next = index >= 0 && index < ids.length - 1 ? index + 1 : null;
    }

    private subscribe() {
        if (this.imageRef) {
            fromEvent(this.image, 'load')
                .pipe(
                    take(1),
                    switchMap(() => this.maxVisibleSize)
                )
                .subscribe(maxSize => this.resizeImage(this.image, maxSize));

            this.maxVisibleSize
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(size => this.resizeImage(this.image, size));
        }
        if (this.projectItem.video) {
            this.maxVisibleSize
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(size => this.resizeVideo(this.video, size));
        }
    }


    private videoSize(maxVisibleSize: Size): Size {
        const rateable = new RateableSize(16, 9);
        return this.fitSize(maxVisibleSize, rateable);
    }

    private imageSize(image: HTMLImageElement, maxVisibleSize: Size): Size {
        const rateable = new RateableSize(image.naturalWidth, image.naturalHeight);
        const size = new Size(
            Math.min(image.naturalWidth, maxVisibleSize.width),
            Math.min(image.naturalHeight, maxVisibleSize.height)
        );
        return this.fitSize(size, rateable);
    }

    private fitSize(to: Size, from: RateableSize): Size {
        const result = new RateableSize(from.width, from.height);
        if (from.width > from.height) {
            result.height = to.height;
            if (result.width > to.width) {
                result.width = to.width;
            }
        } else {
            result.width = to.width;
            if (result.height > to.height) {
                result.height = to.height;
            }
        }
        return result;
    }

    private resizeImage(image: HTMLImageElement, maxVisibleSize: Size) {
        if (!image.naturalWidth || !image.naturalHeight) {
            return;
        }
        const size = this.imageSize(image, maxVisibleSize);
        image.setAttribute('width', size.width.toString());
        image.setAttribute('height', size.height.toString());
    }

    private resizeVideo(video: HTMLElement, maxVisibleSize: Size) {
        const size = this.videoSize(maxVisibleSize);
        this.renderer.setStyle(this.video, 'width', size.width + 'px');
        this.renderer.setStyle(this.video, 'height', size.height + 'px');
    }
}
