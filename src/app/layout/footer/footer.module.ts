import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MaterialAndFlexModule } from '../../shared/material-and-flex.module';
import { MatRippleModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [FooterComponent],
    declarations: [FooterComponent],
    imports: [
        CommonModule,
        MaterialAndFlexModule,
        MatRippleModule,
        RouterModule
    ]
})
export class FooterModule { }
