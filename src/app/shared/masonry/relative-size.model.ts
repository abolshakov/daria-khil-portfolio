import { Direction } from './direction.enum';
import { Size } from './size.model';

export class RelativeSize {
    private _size: Size;

    public get size(): Size {
        return new Size(this._size.width, this._size.height);
    }

    public get mainAxis(): number {
        return this._size[this.mainAxisName];
    }

    public set mainAxis(value: number) {
        this._size[this.mainAxisName] = value;
    }

    public get crossAxis(): number {
        return this._size[this.crossAxisName];
    }

    public set crossAxis(value: number) {
        this._size[this.crossAxisName] = value;
    }

    public get mainAxisName(): string {
        return this.direction === Direction.row ? 'width' : 'height';
    }

    public get crossAxisName(): string {
        return this.direction === Direction.row ? 'height' : 'width';
    }

    constructor(size: Size, public direction: Direction) {
        this._size = new Size(size.width, size.height);
    }
}
