import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NavigationModule } from '../navigation/navigation.module';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [HeaderComponent],
    declarations: [HeaderComponent],
    imports: [CommonModule, MaterialAndFlexModule, NavigationModule]
})
export class HeaderModule { }
