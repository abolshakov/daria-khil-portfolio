import { EventEmitter, Injectable } from '@angular/core';
import { NavigationItem } from 'src/app/navigation/shared/navigation-item';
import { NavigationRegistryService } from 'src/app/navigation/shared/navigation-registry.service';
import {
    Observable,
    of,
    ReplaySubject,
    Subscription
    } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeaderService {
    private readonly defaultTitle: Observable<string> = this.navigation.currentItemChanges
        .pipe(switchMap((current: NavigationItem) => of(current.description)));

    private readonly defaultSubtitle: Observable<string> = of('');

    private titleSubscription: Subscription;
    private subtitleSubscription: Subscription;

    public readonly dockedHeight = new ReplaySubject<number>(1);

    public readonly contentTitle = new EventEmitter<string>(true);
    public readonly contentSubtitle = new EventEmitter<string>(true);

    public set titleProvider(provider: Observable<string>) {
        if (this.titleSubscription) {
            this.titleSubscription.unsubscribe();
        }
        if (provider === null) {
            provider = this.defaultTitle;
        }
        this.titleSubscription = provider.subscribe(title => this.contentTitle.next(title));
    }

    public set subtitleProvider(provider: Observable<string>) {
        if (this.subtitleSubscription) {
            this.subtitleSubscription.unsubscribe();
        }
        if (provider === null) {
            provider = this.defaultSubtitle;
        }
        this.subtitleSubscription = provider.subscribe(subtitle => this.contentSubtitle.next(subtitle));
    }

    constructor(private navigation: NavigationRegistryService) {
        this.titleProvider = this.defaultTitle;
        this.subtitleProvider = this.defaultSubtitle;
    }
}
