import { ElementInfo } from './element-info.interface';
import { RelativeSize } from './relative-size.model';

export class Line {
    private readonly roundingCompensation = 0.5;

    private _size: RelativeSize;
    private _elements: ElementInfo[] = [];
    private _freeSpace: number;

    public get elements(): ElementInfo[] {
        return this._elements;
    }

    public get freeSpace(): number {
        return this._freeSpace;
    }

    public constructor(relativeSize: RelativeSize) {
        this._size = new RelativeSize(relativeSize.size, relativeSize.direction);
        this._size.mainAxis -= this.roundingCompensation;
        this._freeSpace = this._size.mainAxis;
    }

    public assign(element: ElementInfo): boolean {
        if (this._freeSpace <= 0) {
            return false;
        }
        const clone = element.clone();
        const relativeSize = new RelativeSize(clone.size, this._size.direction);
        const relativeMargins = new RelativeSize(clone.margins, this._size.direction);
        relativeSize.crossAxis = this._size.crossAxis - relativeMargins.crossAxis;
        let remainingSpace = this._freeSpace - relativeSize.mainAxis - relativeMargins.mainAxis;

        if (remainingSpace < 0) {
            if (this._elements.length === 0) {
                relativeSize.mainAxis = this._size.mainAxis - relativeMargins.mainAxis;
                remainingSpace = 0;
            } else {
                return false;
            }
        }
        clone.size = relativeSize.size;
        this._elements.push(clone);
        this._freeSpace = remainingSpace;
        return true;
    }

    public fit() {
        if (!this._freeSpace) {
            return;
        }
        const rise = this.crossAxisRise();
        this.elements.forEach(x => {
            const relativeSize = new RelativeSize(x.size, this._size.direction);
            relativeSize.crossAxis += rise;
            x.size = relativeSize.size;
        });
        this._freeSpace = this._size.mainAxis - this._elements
            .map(x => {
                const relativeSize = new RelativeSize(x.size, this._size.direction);
                const relativeMargins = new RelativeSize(x.margins, this._size.direction);
                return relativeSize.mainAxis + relativeMargins.mainAxis;
            })
            .reduce((prev, curr) => prev + curr, 0);
    }

    private crossAxisRise(): number {
        const crossAxisIncrement = 1;
        let freeSpaceDecreased = this._size.mainAxis;
        this.elements.forEach(x => {
            const relativeSize = new RelativeSize(x.size, this._size.direction);
            const relativeMargins = new RelativeSize(x.margins, this._size.direction);
            relativeSize.crossAxis += crossAxisIncrement;
            freeSpaceDecreased -= relativeSize.mainAxis + relativeMargins.mainAxis;
        });

        const delta = this._freeSpace - freeSpaceDecreased;
        const rise = delta ? this._freeSpace / delta : 0;
        return rise;
    }
}
