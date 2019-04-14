import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  Renderer2,
  ViewChild
  } from '@angular/core';
import { DialogComponent } from '../dialog/dialog';
import { GalleryItems, PreviewItem } from '../gallery-items/gallery-items';
import { MatDialog } from '@angular/material';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';


export interface DialogData {
  item: PreviewItem;
}

@Component({
  selector: 'pfo-gallery',
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss']
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

  openDialog(item: PreviewItem): void {
    this.dialog.open(DialogComponent, {
      data: {
        item: item
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
