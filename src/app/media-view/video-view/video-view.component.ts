import { AbstractMediaView } from '../abstract-media-view';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ElementRef, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { EmbedVideoService } from '../../shared/embed-video.service/embed-video.service';
import { filter, map, takeUntil, tap, take } from 'rxjs/operators';
import { ProjectItem } from '../../shared/gallery/project-item.model';
import { RateableSize } from '../../shared/masonry/rateable-size.model';
import { SafeHtml } from '@angular/platform-browser';
import { ShellService } from '../../layout/shell/shared/shell.service';
import { Size } from '../../shared/size-model';

@Component({
    selector: 'pfo-video-view',
    templateUrl: './video-view.component.html',
    styleUrls: ['./video-view.component.scss'],
})
export class VideoViewComponent extends AbstractMediaView implements AfterViewInit {
    @ViewChild('video', { static: false }) videoRef: ElementRef<HTMLElement>;

    public readonly videoHtml = new EventEmitter<SafeHtml>(true);

    public get projectItem(): ProjectItem {
        return this.route.snapshot.data['projectItem'];
    }

    private get video(): HTMLElement {
        return this.videoRef.nativeElement;
    }

    constructor(
        shell: ShellService,
        route: ActivatedRoute,
        private renderer: Renderer2,
        private videoService: EmbedVideoService
    ) {
        super(shell, route);
        console.log('VIDEO VIEW CREATED');
    }

    public ngAfterViewInit() {
        this.route.params
            .pipe(
                takeUntil(this.unsubscribe),
                map(() => this.projectItem.video
                    ? this.videoService.embed(this.projectItem.video)
                    : '')
            )
            .subscribe(html => {
                console.log('VIDEO ROUTE CHANGED');
                if (!html) {
                    this.resizeVideo(this.video, null);
                } else {
                    this.maxVisibleSize
                        .pipe(
                            take(1),
                            tap(() => console.log('VIDEO VIEW SIZE CHANGED')))
                        .subscribe(size => this.resizeVideo(this.video, size));
                }
                this.videoHtml.next(html);
            });

        this.maxVisibleSize
            .pipe(
                takeUntil(this.unsubscribe),
                filter(() => !!this.projectItem.video),
                tap(() => console.log('VIDEO VIEW SIZE CHANGED')))
            .subscribe(size => this.resizeVideo(this.video, size));
    }

    private resizeVideo(video: HTMLElement, maxVisibleSize: Size) {
        console.log('RESIZE VIDEO');
        if (!maxVisibleSize) {
            this.renderer.setStyle(video, 'width', 0);
            this.renderer.setStyle(video, 'height', 0);
            return;
        }
        const size = this.videoSize(maxVisibleSize);
        this.renderer.setStyle(video, 'width', size.width + 'px');
        this.renderer.setStyle(video, 'height', size.height + 'px');
    }

    private videoSize(maxVisibleSize: Size): Size {
        const rateable = new RateableSize(16, 9);
        return this.fitSize(maxVisibleSize, rateable);
    }
}
