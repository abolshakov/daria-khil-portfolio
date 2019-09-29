import { forkJoin, from, fromEvent, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';

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
                switchMap(() => forkJoin(loading).pipe(take(1)))
            );
    }
}
