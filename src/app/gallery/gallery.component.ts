import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/gallery/category.enum';
import { Component } from '@angular/core';
import { GalleryService, PortfolioItem } from '../shared/gallery/gallery.service';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Unsubscribable } from '../shared/unsubscribable';

export interface DialogData {
  item: PortfolioItem;
}

@Component({
  selector: 'pfo-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends Unsubscribable {

  public get projects() {
    return this.route.params
      .pipe(
        take(1),
        switchMap(params => of(params['category']
          ? this.gallery.portfolio.filter(x => x.category === Category[params['category']])
          : this.gallery.portfolio
        ))
      );
  }

  constructor(
    private gallery: GalleryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  openProject(item: PortfolioItem): void {
    this.router.navigate([this.router.url, item.id]);
  }
}
