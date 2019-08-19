import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { NavigationItem } from './shared/navigation-item';
import { NavigationRegistryService } from './shared/navigation-registry.service';
import { takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '../shared/unsubscribable';

@Component({
  selector: 'pfo-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends Unsubscribable {
  private _items = new BehaviorSubject<NavigationItem[]>(this.navigation.NavigationItems);

  public get items(): BehaviorSubject<NavigationItem[]> {
    return this._items;
  }

  constructor(private navigation: NavigationRegistryService) {
    super();
    this.navigation.currentItemChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this._items.next(this.navigation.NavigationItems));
  }
}
