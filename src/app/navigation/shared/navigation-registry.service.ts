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

  public currentItemChanges = new EventEmitter<NavigationItem>(true);

  constructor() {
    this._items = [];
  }

  public register(id: number, route: string, area: NavigationArea, title: string, description?: string) {
    const navigationItem = new NavigationItem(id, route, area, title, description);
    if (!_.isNull(this.getItem(navigationItem.key, true))) {
      throw new Error(`Could not register NavigationItem: NavigationItem with key=${navigationItem.key} already exist`);
    }
    this._items.push(navigationItem);
    this._items = _.sortBy(this._items, (x: NavigationItem) => x.id);
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
    const item = this.getItem(path, false);
    if (!item) {
      this._currentItem = this.emptyItem;
      return;
    }
    this._currentItem = item;
    this._currentItem.selected = true;
    this.currentItemChanges.emit(this._currentItem);
  }

  private getItem(key: string, strict: boolean): NavigationItem {
    return strict
      ? _.find(this._items, (x) => x.key === key) || null
      : _.maxBy(this._items, (x => key.indexOf(x.key) > -1 ? x.key.length : 0));
  }
}
