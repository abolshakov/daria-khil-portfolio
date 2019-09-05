import { Injectable } from '@angular/core';
import { NavigationItem } from 'src/app/navigation/shared/navigation-item';
import { NavigationRegistryService } from 'src/app/navigation/shared/navigation-registry.service';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeaderService {
    private readonly default: Observable<string> = this.navigation.currentItemChanges
        .pipe(switchMap((current: NavigationItem) => of(current.description)));

    private _title = '';

    private subscription: Subscription;

    public get ContentTitle(): string {
        return this._title;
    }

    public set TitleProvider(provider: Observable<string>) {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (provider === null) {
            provider = this.default;
        }
        this.subscription = provider.subscribe(title => this._title = title);
    }

    constructor(private navigation: NavigationRegistryService) {
        this.TitleProvider = this.default;
    }
}