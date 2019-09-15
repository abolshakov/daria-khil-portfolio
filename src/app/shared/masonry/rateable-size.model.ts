import { Size } from '../size-model';

export class RateableSize extends Size {
    public get width(): number {
        return super.width;
    }

    public set width(value: number) {
        this.resise(value, null);
    }

    public get height(): number {
        return super.height;
    }

    public set height(value: number) {
        this.resise(null, value);
    }

    constructor(width: number, height: number) {
        super(width, height);
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
