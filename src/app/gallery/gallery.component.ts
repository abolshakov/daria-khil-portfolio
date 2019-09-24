import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/gallery/category.enum';
import { Component } from '@angular/core';
import { GalleryService } from '../shared/gallery/gallery.service';
import { of } from 'rxjs';
import { Project } from '../shared/gallery/project.model';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '../shared/unsubscribable';

export interface DialogData {
  item: Project;
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
        takeUntil(this.unsubscribe),
        switchMap(params => of(params['category']
          ? this.gallery.portfolio.filter(x => x.category === Category[params['category']])
          : this.gallery.portfolio
        ).pipe(take(1))),
        takeUntil(this.unsubscribe)
      );
  }

  constructor(
    private gallery: GalleryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  public openProject(item: Project): void {
    this.router.navigate([this.router.url, item.id, 'fragments']);
  }
}
