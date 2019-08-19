import { ActivatedRoute } from '@angular/router';
import { GalleryService, PortfolioItem } from '../shared/gallery/gallery.service';
import { HeaderService } from '../header/shared/header.service';
import { Observable, of } from 'rxjs';
import { Unsubscribable } from '../shared/unsubscribable';
import {
    filter,
    switchMap,
    takeUntil,
    } from 'rxjs/operators';
import {
    AfterViewInit,
    Component,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'pfo-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent extends Unsubscribable implements OnInit, AfterViewInit {
    @ViewChild('visibleArea', { static: false }) visibleArea: { nativeElement: HTMLElement; };

    public get portfolioItem(): Observable<PortfolioItem> {
        return this.route.params.pipe(
            takeUntil(this.unsubscribe),
            switchMap(params => of(this.gallery.project(params['id'])))
        );
    }

    public visibleWidth: number;
    public visibleHeight: number;

    constructor(
        private route: ActivatedRoute,
        private gallery: GalleryService,
        private header: HeaderService
    ) {
        super();
    }

    ngOnInit() {
        this.header.TitleProvider = this.portfolioItem
            .pipe(
                filter(p => !!p),
                switchMap(p => of(p.title))
            );
    }

    ngAfterViewInit(): void {
        Promise.resolve(null).then(() =>
            this.calculateSize(this.visibleArea.nativeElement));
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.header.TitleProvider = null;
    }

    @HostListener('window:resize')
    onResize() {
        this.calculateSize(this.visibleArea.nativeElement);
    }

    private calculateSize(element: HTMLElement): void {
        // const style: CSSStyleDeclaration = window.getComputedStyle(element);
        // const horizontalPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        // const verticalPadding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        // this.visibleWidth = element.clientWidth - horizontalPadding;
        // this.visibleHeight = element.clientHeight - verticalPadding;
        this.visibleWidth = window.innerWidth / 4;
        this.visibleHeight = window.innerHeight / 4;
        console.log('CALCULATE W x H', this.visibleWidth, this.visibleHeight);
    }
}
