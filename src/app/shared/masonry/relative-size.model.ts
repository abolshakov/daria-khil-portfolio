import { Direction } from './direction.enum';
import { RateableSize } from './rateable-size.model';

export class RelativeSize {
    private _size: RateableSize;

    public get size(): RateableSize {
        return new RateableSize(this._size.width, this._size.height);
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

    constructor(size: RateableSize, public direction: Direction) {
        this._size = new RateableSize(size.width, size.height);
    }
}
