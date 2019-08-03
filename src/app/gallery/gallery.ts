import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog';
import { GalleryItems, PreviewItem } from '../gallery-items/gallery-items';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '../shared/unsubscribable';

export interface DialogData {
  item: PreviewItem;
}

@Component({
  selector: 'pfo-gallery',
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss']
})
export class GalleryComponent extends Unsubscribable {

  public get previewItems() {
    return this.route.data
      .pipe(
        takeUntil(this.unsubscribe),
        switchMap(data => of(data.filter
          ? this.items.previewItems.filter(x => x.category === data.filter)
          : this.items.previewItems
        ))
      );
  }

  constructor(
    private dialog: MatDialog,
    private items: GalleryItems,
    private route: ActivatedRoute
  ) {
    super();
  }

  openDialog(item: PreviewItem): void {
    this.dialog.open(DialogComponent, {
      data: {
        item: item
      },
      autoFocus: false
    });
  }
}
