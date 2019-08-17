import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { GalleryService, PortfolioItem } from '../shared/gallery/gallery.service';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
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

  public get portfolioItems() {
    return this.route.data
      .pipe(
        takeUntil(this.unsubscribe),
        switchMap(data => of(data.filter
          ? this.gallery.portfolio.filter(x => x.category === data.filter)
          : this.gallery.portfolio
        ))
      );
  }

  constructor(
    private dialog: MatDialog,
    private gallery: GalleryService,
    private route: ActivatedRoute
  ) {
    super();
  }

  openDialog(item: PortfolioItem): void {
    this.dialog.open(DialogComponent, {
      data: {
        item: item
      },
      autoFocus: false
    });
  }
}
