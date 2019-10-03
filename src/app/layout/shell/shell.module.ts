import { AlertSnackComponent } from '../../alert-snack/alert-snack.component';
import { AlertSnackModule } from '../../alert-snack/alert-snack.module';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { FooterModule } from '../footer/footer.module';
import { GalleryModule } from '../../gallery/gallery.module';
import { HeaderModule } from '../header/header.module';
import { MainModule } from '../main/main.module';
import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [
    AlertSnackModule,
    CommonModule,
    GalleryModule,
    HeaderModule,
    FooterModule,
    FlexModule,
    MainModule
  ],
  declarations: [ShellComponent],
  entryComponents: [AlertSnackComponent],
  exports: [ShellComponent]
})
export class ShellModule { }
