import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MaterialAndFlexModule } from '../shared/material-and-flex.module';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [FooterComponent],
    declarations: [FooterComponent],
    imports: [CommonModule, MaterialAndFlexModule]
})
export class FooterModule { }
