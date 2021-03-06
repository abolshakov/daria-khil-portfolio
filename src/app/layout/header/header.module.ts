import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialAndFlexModule } from '../../material-and-flex.module';
import { NavigationModule } from '../../navigation/navigation.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [HeaderComponent],
    declarations: [HeaderComponent],
    imports: [CommonModule, MaterialAndFlexModule, NavigationModule, RouterModule]
})
export class HeaderModule { }
