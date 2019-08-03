import * as _ from 'lodash';
import { Injectable, EventEmitter } from '@angular/core';
import { NavigationItem } from './navigation-item';
import { NavigationArea } from './navigation-area.enum';

@Injectable({
  providedIn: 'root'
})
export class NavigationRegistryService {
  private readonly emptyItem = new NavigationItem(0, '', NavigationArea.Undefined, '');

  private _items: NavigationItem[];
  private _currentItem: NavigationItem;

  public itemChanges = new EventEmitter<void>(true);

  constructor() {
    this._items = [];
  }

  public register(id: number, route: string, area: NavigationArea, title: string, description?: string) {
    const navigationItem = new NavigationItem(id, route, area, title, description);
    if (!_.isNull(this.getItem(navigationItem.key))) {
      throw new Error(`Could not register NavigationItem: NavigationItem with key=${navigationItem.key} already exist`);
    }
    this._items.push(navigationItem);
    this._items = _.sortBy(this._items, (x) => x.id);
  }

  public get NavigationItems(): NavigationItem[] {
    return this._items;
  }

  public get CurrentItem(): NavigationItem {
    return this._currentItem;
  }

  public get FirstItem(): NavigationItem {
    return this._items.length
      ? this._items[0]
      : this.emptyItem;
  }

  public get NextItem(): NavigationItem {
    const currentItemIndex = _.indexOf(this._items, this._currentItem);
    const nextItemIndex = currentItemIndex === this._items.length ? currentItemIndex : currentItemIndex + 1;
    return this._items[nextItemIndex];
  }

  public get PrevItem(): NavigationItem {
    const currentItemIndex = _.indexOf(this._items, this._currentItem);
    const prevItemIndex = currentItemIndex === 0 ? currentItemIndex : currentItemIndex - 1;
    return this._items[prevItemIndex];
  }

  // temporary state management
  public setCurrent(path: string) {
    if (this._currentItem) {
      this._currentItem.selected = false;
    }
    const item = this.getItem(path);
    if (!item) {
      this._currentItem = this.emptyItem;
      return;
    }
    this._currentItem = item;
    this._currentItem.selected = true;
    this.itemChanges.emit();
  }

  private getItem(key: string): NavigationItem {
    return _.find(this._items, (x) => x.key === key) || null;
  }
}
