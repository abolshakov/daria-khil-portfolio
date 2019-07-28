import { CommonModule } from '@angular/common';
import { FooterModule } from '../footer/footer.module';
import { GalleryModule } from '../gallery/gallery';
import { HeaderModule } from '../header/header.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [
    CommonModule,
    GalleryModule,
    HeaderModule,
    FooterModule,
    RouterModule
  ],
  declarations: [ShellComponent],
  exports: [ShellComponent]
})
export class ShellModule { }
