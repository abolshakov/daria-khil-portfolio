import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComparerService } from '../shared/comparer.service';
import { debounceTime, distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { Direction } from '../shared/masonry/direction.enum';
import { HeaderService } from '../layout/header/shared/header.service';
import { ImageInfoService } from '../shared/image-info/image-info.service';
import { ImageLoadService } from '../shared/image-info/image-load.service';
import { MainSectionService } from '../layout/main/shared/main-section.service';
import { MasonryService } from '../shared/masonry/masonry.service';
import { of } from 'rxjs';
import { Project } from '../shared/gallery/project.model';
import { RateableSize } from '../shared/masonry/rateable-size.model';
import { Unsubscribable } from '../shared/unsubscribable';

@Component({
    selector: 'pfo-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent extends Unsubscribable implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('container', { static: true }) containerRef: ElementRef<HTMLElement>;
    @ViewChildren('img') imageRefs: QueryList<ElementRef<HTMLImageElement>>;

    private imageElements: HTMLImageElement[];

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
        private mainSection: MainSectionService,
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
        this.imageElements = this.imageRefs.map(r => r.nativeElement);

        this.loader.whenAll(this.imageElements)
            .pipe(take(1))
            .subscribe(() => {
                this.loading = false;
                this.construct();
            });

        this.mainSection.margins
            .pipe(
                takeUntil(this.unsubscribe),
                debounceTime(100),
                distinctUntilChanged(ComparerService.byAllFields)
            )
            .subscribe(() => {
                this.construct();
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
        this.router.navigate([this.router.url, itemId], { replaceUrl: replaceUrl });
    }

    private construct() {
        const info = this.imageInfo.retrive(this.imageElements);
        const style = window.getComputedStyle(this.containerRef.nativeElement);
        const width = Math.floor(Number.parseFloat(style.width));
        const height = document.documentElement.clientHeight / 3;
        const lineSize = new RateableSize(width, height);
        const updatedInfo = this.masonry.construct(info, lineSize, Direction.row);
        this.imageInfo.update(this.imageElements, updatedInfo);
    }
}
