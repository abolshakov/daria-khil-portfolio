import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FooterService {
    public height = new ReplaySubject<number>(1);

    constructor() { }
}
