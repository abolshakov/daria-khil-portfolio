import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatRippleModule],
    exports: [
        FlexLayoutModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatRippleModule],
})
export class MaterialAndFlexModule { }
