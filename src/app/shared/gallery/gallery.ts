import { Component, NgModule, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material';
import { MaterialAndFlexModule } from '../material-and-flex.module';

import { GalleryItems, GalleryItem } from '../gallery-items/gallery-items';
import { DialogComponent } from '../dialog/dialog';

export interface DialogData {
  item: GalleryItem;
  tempImage: String;
}

@Component({
  selector: 'pfo-gallery',
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css']
})
export class GalleryComponent {
  private readonly elevation: string = 'mat-elevation-z10';

  constructor(public galleryItems: GalleryItems, private renderer2: Renderer2, private dialog: MatDialog) { }

  public mouseenter(target): void {
    this.renderer2.addClass(target, this.elevation);
  }

  public mouseleave(target): void {
    this.renderer2.removeClass(target, this.elevation);
  }

  openDialog(item: GalleryItem): void {
    const detailedItem = this.galleryItems.getNextProjectItem(item);

    if (!detailedItem) {
      return;
    }
    this.dialog.open(DialogComponent, {
      data: {
        item: detailedItem,
        tempImage: item.image
      },
      autoFocus: false
    });
  }
}

@NgModule({
  exports: [GalleryComponent],
  declarations: [GalleryComponent],
  imports: [CommonModule, MaterialAndFlexModule],
  providers: [GalleryItems]
})
export class GalleryModule { }
