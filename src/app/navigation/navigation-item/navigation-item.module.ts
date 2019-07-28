import { CommonModule } from '@angular/common';
import { NavigationItemComponent } from './navigation-item.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatRippleModule,
    FlexLayoutModule
  ],
  declarations: [NavigationItemComponent],
  exports: [NavigationItemComponent]

})
export class NavigationItemModule { }
