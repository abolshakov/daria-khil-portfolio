import { Injectable } from '@angular/core';
import { Size } from 'src/app/shared/size-model';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MainSectionService {
    public readonly margins = new ReplaySubject<Size>(1);
}
