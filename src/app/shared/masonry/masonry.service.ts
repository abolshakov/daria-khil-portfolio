import { Direction } from './direction.enum';
import { ElementInfo } from './element-info.interface';
import { Injectable } from '@angular/core';
import { Line } from './line.model';
import { OptimizationStrategy } from './optimization.strategy';
import { RelativeSize } from './relative-size.model';
import { Size } from './size.model';
import { Wall } from './wall.model';

@Injectable({ providedIn: 'root' })
export class MasonryService {
    constructor(private strategy: OptimizationStrategy) { }

    public construct(elements: ElementInfo[], lineSize: Size, direction: Direction): ElementInfo[] {
        const relativeSize = new RelativeSize(lineSize, direction);
        const wall = this.build(elements, relativeSize, [new Wall()]);
        wall.fitLines();
        return [].concat(...wall.lines.map(x => x.elements));
    }

    private build(elements: ElementInfo[], size: RelativeSize, cache: Wall[]): Wall {
        if (cache.length > elements.length) {
            return cache[elements.length].clone();
        }
        let optimalWall: Wall;
        let optimalValue = 0;

        for (let i = elements.length; i > 0; i--) {
            const firstLine = new Line(size);
            for (let j = 0; j < i; j++) {
                if (!firstLine.assign(elements[j])) {
                    i = j;
                    break;
                }
            }
            const remainingCount = elements.length - firstLine.elements.length;
            const wall = this.build(remainingCount ? elements.slice(-remainingCount) : [], size, cache);
            wall.prepend(firstLine);
            const value = this.strategy.evaluate(wall, size);
            if (value > optimalValue) {
                optimalWall = wall;
                optimalValue = value;
            }
        }
        cache.push(optimalWall);
        return optimalWall;
    }
}
