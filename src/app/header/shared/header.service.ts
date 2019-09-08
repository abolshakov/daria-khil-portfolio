import { Injectable } from '@angular/core';
import { NavigationItem } from 'src/app/navigation/shared/navigation-item';
import { NavigationRegistryService } from 'src/app/navigation/shared/navigation-registry.service';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeaderService {
    private readonly defaultTitle: Observable<string> = this.navigation.currentItemChanges
        .pipe(switchMap((current: NavigationItem) => of(current.description)));

    private readonly defaultSubtitle: Observable<string> = of('');

    private _title = '';
    private _subtitle = '';

    private titleSubscription: Subscription;
    private subtitleSubscription: Subscription;

    public get ContentTitle(): string {
        return this._title;
    }

    public get ContentSubtitle(): string {
        return this._subtitle;
    }

    public set TitleProvider(provider: Observable<string>) {
        if (this.titleSubscription) {
            this.titleSubscription.unsubscribe();
        }
        if (provider === null) {
            provider = this.defaultTitle;
        }
        this.titleSubscription = provider.subscribe(title => this._title = title);
    }

    public set SubtitleProvider(provider: Observable<string>) {
        if (this.subtitleSubscription) {
            this.subtitleSubscription.unsubscribe();
        }
        if (provider === null) {
            provider = this.defaultSubtitle;
        }
        this.subtitleSubscription = provider.subscribe(subtitle => this._subtitle = subtitle);
    }

    constructor(private navigation: NavigationRegistryService) {
        this.TitleProvider = this.defaultTitle;
        this.SubtitleProvider = this.defaultSubtitle;
    }
}
