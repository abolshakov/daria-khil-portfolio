import { AbstractMediaView } from '../abstract-media-view';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ElementRef, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { EmbedVideoService } from '../../shared/embed-video.service/embed-video.service';
import { RateableSize } from '../../shared/masonry/rateable-size.model';
import { SafeHtml } from '@angular/platform-browser';
import { ShellService } from '../../layout/shell/shared/shell.service';
import { Size } from '../../shared/size-model';
import { take, takeUntil, tap, switchMap, filter, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'pfo-video-view',
    templateUrl: './video-view.component.html',
    styleUrls: ['./video-view.component.scss'],
})
export class VideoViewComponent extends AbstractMediaView implements AfterViewInit {
    @ViewChild('video', { static: false }) videoRef: ElementRef<HTMLElement>;

    public readonly videoHtml = new EventEmitter<SafeHtml>(true);

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
    }

    public ngAfterViewInit() {
        this.route.params
            .pipe(
                takeUntil(this.unsubscribe),
                filter(() => !!this.projectItem.video),
                switchMap(() => this.maxVisibleSize.pipe(take(1)))
            )
            .subscribe(size => {
                this.resizeVideo(this.video, size);
                this.videoHtml.next(this.videoService.embed(this.projectItem.video));
            });

        this.maxVisibleSize
            .pipe(
                takeUntil(this.unsubscribe),
                debounceTime(200),
                filter(() => !!this.projectItem.video),
            )
            .subscribe(size => {
                this.resizeVideo(this.video, size);
            });
    }

    private resizeVideo(video: HTMLElement, maxVisibleSize: Size) {
        const size = this.videoSize(maxVisibleSize);
        this.renderer.setStyle(video, 'width', size.width + 'px');
        this.renderer.setStyle(video, 'height', size.height + 'px');
    }

    private videoSize(maxVisibleSize: Size): Size {
        const rateable = new RateableSize(16, 9);
        return this.fitSize(maxVisibleSize, rateable);
    }
}
