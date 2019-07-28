import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class Unsubscribable implements OnDestroy {

    protected unsubscribe: Subject<void> = new Subject();

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
