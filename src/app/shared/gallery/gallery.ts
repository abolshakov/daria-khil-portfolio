import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material';
import { MaterialAndFlexModule } from '../material-and-flex.module';

import { GalleryItems, GalleryItem } from '../gallery-items/gallery-items';
import { DialogComponent } from '../dialog/dialog';

@Component({
  selector: 'pfo-gallery',
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css']
})
export class GalleryComponent {
  constructor(public galleryItems: GalleryItems, private dialog: MatDialog) { }

  openDialog(item: GalleryItem): void {
    const detailedItem = this.galleryItems.getNextProjectItem(item);

    if (!detailedItem) {
      return;
    }
    const dialogRef = this.dialog.open(DialogComponent, { data: detailedItem });
  }
}

@NgModule({
  exports: [GalleryComponent],
  declarations: [GalleryComponent],
  imports: [CommonModule, MaterialAndFlexModule],
  providers: [GalleryItems]
})
export class GalleryModule { }
