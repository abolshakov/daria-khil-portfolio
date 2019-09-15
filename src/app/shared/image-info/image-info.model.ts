import { ElementInfo } from '../masonry/element-info.interface';
import { RateableSize } from '../masonry/rateable-size.model';

export class ImageInfo extends RateableSize implements ElementInfo {
    public get size(): RateableSize {
        return new RateableSize(this.width, this.height);
    }

    public set size(value: RateableSize) {
        this._width = value.width;
        this._height = value.height;
    }

    constructor(size: RateableSize, public margins: RateableSize) {
        super(size.width, size.height);
    }

    public clone(): ElementInfo {
        return new ImageInfo(
            new RateableSize(this.size.width, this.size.height),
            new RateableSize(this.margins.width, this.margins.height)
        );
    }
}
