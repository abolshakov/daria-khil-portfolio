export class Size {
    protected _width: number;
    protected _height: number;

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this.resise(value, null);
    }

    public get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this.resise(null, value);
    }

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    private get ratio(): number {
        return this._height ? this._width / this._height : 0;
    }

    private resise(width: number | null, height: number | null) {
        if (!width && !height) {
            return;
        }
        if (width && height) {
            this._width = width;
            this._height = height;
            return;
        }
        const ratio = this.ratio;
        if (width) {
            this._width = width;
            this._height = ratio ? (width / ratio) : 0;
            return;
        }
        this._width = ratio * height;
        this._height = height;
    }
}
