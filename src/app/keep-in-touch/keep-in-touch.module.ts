import { AboutModule } from '../about/about.module';
import { CommonModule } from '@angular/common';
import { ContactModule } from '../contact/contact.module';
import { KeepInTouchComponent } from './keep-in-touch.component';
import { MaterialAndFlexModule } from '../material-and-flex.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    ContactModule,
    MaterialAndFlexModule
  ],
  declarations: [KeepInTouchComponent],
  exports: [KeepInTouchComponent]
})
export class KeepInTouchModule { }
