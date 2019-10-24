import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { MatButtonModule, MatDividerModule, MatInputModule } from '@angular/material';
import { MaterialAndFlexModule } from '../material-and-flex.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialAndFlexModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [ContactComponent],
  exports: [ContactComponent]
})
export class ContactModule { }
