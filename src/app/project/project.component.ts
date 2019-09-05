import { ActivatedRoute } from '@angular/router';
import { Direction } from '../shared/masonry/direction.enum';
import { ElementInfo } from '../shared/masonry/element-info.interface';
import {
    fromEvent,
    Observable,
    of,
    ReplaySubject
} from 'rxjs';
import { GalleryService, PortfolioItem } from '../shared/gallery/gallery.service';
import { ImageInfoService } from '../shared/image-info/image-info.service';
import { ImageLoadService } from '../shared/image-info/image-load.service';
import { MasonryService } from '../shared/masonry/masonry.service';
import { NavigationRegistryService } from '../navigation/shared/navigation-registry.service';
import { Size } from '../shared/masonry/size.model';
import { Unsubscribable } from '../shared/unsubscribable';
import {
    debounceTime,
    switchMap,
    take,
    takeUntil,
    filter,
} from 'rxjs/operators';
import {
    AfterViewInit,
    Component,
    ViewChild,
    OnDestroy,
    ElementRef,
    ViewChildren,
    QueryList,
    OnInit,
} from '@angular/core';

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

    public get sources(): Observable<string[]> {
        return this.portfolioItem.pipe(
            takeUntil(this.unsubscribe),
            switchMap(portfolio => of(portfolio.projectItems.map(x => x.image)))
        );
    }

    private get portfolioItem(): Observable<PortfolioItem> {
        return this.route.params.pipe(
            takeUntil(this.unsubscribe),
            switchMap(params => of(this.gallery.project(params['id'])))
        );
    }

    constructor(
        private gallery: GalleryService,
        private imageInfo: ImageInfoService,
        private loader: ImageLoadService,
        private masonry: MasonryService,
        private navigation: NavigationRegistryService,
        private route: ActivatedRoute,
    ) {
        super();
    }

    ngOnInit() {
        this.portfolioItem
            .pipe(takeUntil(this.unsubscribe), filter(p => !!p))
            .subscribe(p => this.navigation.CurrentItem.description = p.title);
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
                takeUntil(this.unsubscribe),
                debounceTime(500)
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

    private construct(info: ElementInfo[]) {
        const lineSize = new Size(this.containerRef.nativeElement.clientWidth, Math.min(window.innerHeight, window.innerWidth) / 3);
        const updatedInfo = this.masonry.construct(info, lineSize, Direction.row);
        this.imageInfo.update(this.imageRefs.map(r => r.nativeElement), updatedInfo);
    }
}
