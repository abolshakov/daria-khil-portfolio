import { CommonModule } from '@angular/common';
import { MaterialAndFlexModule } from '../material-and-flex.module';
import { NgModule } from '@angular/core';
import { ProjectComponent } from './project.component';

@NgModule({
    exports: [ProjectComponent],
    imports: [
        CommonModule,
        MaterialAndFlexModule
    ],
    declarations: [ProjectComponent]
})
export class ProjectModule { }
