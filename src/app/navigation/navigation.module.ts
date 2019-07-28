import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationComponent } from './navigation.component';
import { NavigationItemModule } from './navigation-item/navigation-item.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavigationItemModule,
    FlexLayoutModule
  ],
  declarations: [NavigationComponent],
  exports: [NavigationComponent]
})
export class NavigationModule { }
