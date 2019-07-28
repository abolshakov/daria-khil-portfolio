import * as _ from 'lodash';
import { NavigationArea } from './navigation-area.enum';

export class NavigationItem {
    public readonly id: number;
    public readonly route: string;
    public readonly area: NavigationArea;
    public readonly title: string;
    private _description: string;
    private _selected: boolean;

    constructor(id: number, route: string, area: NavigationArea, title: string, description?: string, selected?: boolean) {
        this.id = id;
        this.route = route;
        this.area = area;
        this.title = title;
        this._description = _.isUndefined(description) ? '' : description;
        this._selected = selected;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        this._selected = value;
    }

    public get key() {
        return this.route;
    }
}
