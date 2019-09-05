import { Line } from './line.model';

export class Wall {
    private _lines: Line[] = [];

    public get lines(): Line[] {
        return this._lines;
    }

    public append(...lines: Line[]) {
        this._lines.push(...lines);
    }

    public clone(): Wall {
        const wall = new Wall();
        wall.append(...this.lines);
        return wall;
    }

    public fitLines() {
        this._lines.forEach(x => x.fit());
    }

    public prepend(line: Line) {
        this._lines.unshift(line);
    }
}
