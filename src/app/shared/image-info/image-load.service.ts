import { Injectable } from '@angular/core';
import { from, Observable, fromEvent, forkJoin } from 'rxjs';
import { switchMap, tap, take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ImageLoadService {
    public whenAll(images: HTMLImageElement[]): Observable<HTMLImageElement[]> {
        const loading: Observable<HTMLImageElement>[] = [];
        return from(images)
            .pipe(
                tap(image => loading.push(fromEvent(image, 'load')
                    .pipe(
                        take(1),
                        map(() => image)
                    ))),
                switchMap(() => forkJoin(loading).pipe())
            );
    }
}
