import { ElementInfo } from '../masonry/element-info.interface';
import { Size } from '../masonry/size.model';

export class ImageInfo extends Size implements ElementInfo {
    public get size(): Size {
        return new Size(this.width, this.height);
    }

    public set size(value: Size) {
        this._width = value.width;
        this._height = value.height;
    }

    constructor(size: Size, public margins: Size) {
        super(size.width, size.height);
    }

    public clone(): ElementInfo {
        return new ImageInfo(new Size(this.size.width, this.size.height), new Size(this.margins.width, this.margins.height));
    }
}
