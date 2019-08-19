import { ActivatedRoute } from '@angular/router';
import { GalleryService, PortfolioItem } from '../shared/gallery/gallery.service';
import { NavigationRegistryService } from '../navigation/shared/navigation-registry.service';
import { take, switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { Unsubscribable } from '../shared/unsubscribable';
import {
    AfterViewInit,
    Component,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Observable, of } from 'rxjs';

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
        private navigation: NavigationRegistryService
    ) {
        super();
    }

    ngOnInit() {
        this.portfolioItem
            .pipe(takeUntil(this.unsubscribe), filter(p => !!p))
            .subscribe(p => this.navigation.CurrentItem.description = p.title);
    }

    ngAfterViewInit(): void {
        Promise.resolve(null).then(() =>
            this.calculateSize(this.visibleArea.nativeElement));
    }

    @HostListener('window:resize')
    onResize() {
        this.calculateSize(this.visibleArea.nativeElement);
    }

    private calculateSize(element: HTMLElement): void {
        const style: CSSStyleDeclaration = window.getComputedStyle(element);
        const horizontalPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        const verticalPadding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        this.visibleWidth = element.clientWidth - horizontalPadding;
        this.visibleHeight = element.clientHeight - verticalPadding;
        console.log('CALCULATE W x H', this.visibleWidth, this.visibleHeight);
    }
}
