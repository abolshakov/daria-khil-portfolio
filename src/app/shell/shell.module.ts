import { AlertSnackComponent } from '../alert-snack/alert-snack.component';
import { AlertSnackModule } from '../alert-snack/alert-snack.module';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../footer/footer.module';
import { GalleryModule } from '../gallery/gallery.module';
import { HeaderModule } from '../header/header.module';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [
    AlertSnackModule,
    CommonModule,
    GalleryModule,
    HeaderModule,
    FooterModule,
    MaterialAndFlexModule,
    RouterModule
  ],
  declarations: [ShellComponent],
  entryComponents: [AlertSnackComponent],
  exports: [ShellComponent]
})
export class ShellModule { }
