export class Size {
    protected _width: number;
    protected _height: number;

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this._width = value;
    }

    public get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this._height = value;
    }

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }
}
