import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    MaterialAndFlexModule,
  ],
  declarations: [ContactComponent],
  exports: [ContactComponent]
})
export class ContactModule { }
