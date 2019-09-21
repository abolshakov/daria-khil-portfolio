import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Direction } from '../shared/masonry/direction.enum';
import { ElementInfo } from '../shared/masonry/element-info.interface';
import { fromEvent, of, ReplaySubject } from 'rxjs';
import { HeaderService } from '../layout/header/shared/header.service';
import { ImageInfoService } from '../shared/image-info/image-info.service';
import { ImageLoadService } from '../shared/image-info/image-load.service';
import { MasonryService } from '../shared/masonry/masonry.service';
import { Project } from '../shared/gallery/project.model';
import { RateableSize } from '../shared/masonry/rateable-size.model';
import { take, takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '../shared/unsubscribable';

@Component({
    selector: 'pfo-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent extends Unsubscribable implements OnInit, AfterViewInit, OnDestroy {
    private elementsInfo = new ReplaySubject<ElementInfo[]>(1);

    @ViewChild('container', { static: true }) containerRef: ElementRef<HTMLElement>;
    @ViewChildren('img') imageRefs: QueryList<ElementRef<HTMLImageElement>>;

    public loading = true;

    public get images(): string[] {
        return this.project.items.map(x => x.image);
    }

    private get project(): Project {
        return this.route.snapshot.data['project'];
    }

    constructor(
        private header: HeaderService,
        private imageInfo: ImageInfoService,
        private loader: ImageLoadService,
        private masonry: MasonryService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        super();
    }

    public ngOnInit() {
        if (this.project.items.length === 1) {
            this.openProjectItem(0, true);
        }
        this.header.titleProvider = of(this.project.title);
        this.header.subtitleProvider = of(this.project.description);
    }

    public ngAfterViewInit() {
        this.loader.whenAll(this.imageRefs.map(r => r.nativeElement))
            .pipe(take(1))
            .subscribe(images => {
                const info = this.imageInfo.retrive(images);
                this.elementsInfo.next(info);
                this.construct(info);
                this.loading = false;
            });

        fromEvent(window, 'resize')
            .pipe(
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.elementsInfo
                    .pipe(take(1))
                    .subscribe(info => {
                        this.loading = true;
                        this.construct(info);
                        this.loading = false;
                    });
            });
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.header.titleProvider = null;
        this.header.subtitleProvider = null;
    }

    public openProjectItem(projectItemIndex: number, replaceUrl: boolean = false): void {
        if (projectItemIndex < 0 || projectItemIndex >= this.project.items.length) {
            return;
        }
        const itemId = this.project.items[projectItemIndex].id;
        this.router.navigate([this.router.url, itemId], {replaceUrl: replaceUrl});
    }

    private construct(info: ElementInfo[]) {
        const style = window.getComputedStyle(this.containerRef.nativeElement);
        const width = Math.floor(Number.parseFloat(style.width));
        const height = document.documentElement.clientHeight / 3;
        const lineSize = new RateableSize(width, height);
        const updatedInfo = this.masonry.construct(info, lineSize, Direction.row);
        this.imageInfo.update(this.imageRefs.map(r => r.nativeElement), updatedInfo);
    }
}
