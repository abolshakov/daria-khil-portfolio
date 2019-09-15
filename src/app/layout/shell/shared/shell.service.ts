import { combineLatest, Observable } from 'rxjs';
import { ComparerService } from '../../../shared/comparer.service';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    tap
} from 'rxjs/operators';
import { FooterService } from '../../footer/shared/footer.service';
import { HeaderService } from '../../header/shared/header.service';
import { Injectable } from '@angular/core';
import { MainSectionService } from '../../main/shared/main-section.service';
import { Size } from 'src/app/shared/size-model';

@Injectable({ providedIn: 'root' })
export class ShellService {
    public get maxVisibleSize(): Observable<Size> {
        return combineLatest([this.header.dockedHeight, this.main.margins, this.footer.height])
            .pipe(
                distinctUntilChanged(ComparerService.byAllFields),
                map((values: [number, Size, number]) => {
                    const [dockedHeight, margins, footerHeight] = values;
                    const heigt = document.documentElement.clientHeight - dockedHeight - margins.height - footerHeight;
                    const width = document.documentElement.clientWidth - margins.width;
                    return new Size(width, heigt);
                })
            );
    }

    constructor(
        private header: HeaderService,
        private main: MainSectionService,
        private footer: FooterService
    ) { }
}
