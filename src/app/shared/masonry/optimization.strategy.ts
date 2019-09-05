import { Injectable } from '@angular/core';
import { RelativeSize } from './relative-size.model';
import { Wall } from './wall.model';

@Injectable({ providedIn: 'root' })
export class OptimizationStrategy {
    public evaluate(wall: Wall, size: RelativeSize): number {
        if (!wall || !size) {
            return 0;
        }
        let min = size.mainAxis;
        let max = 0;
        wall.lines.forEach(x => {
            if (x.freeSpace < min) {
                min = x.freeSpace;
            }
            if (x.freeSpace > max) {
                max = x.freeSpace;
            }
        });
        const delta = max - min;
        const value = 1 / (delta || 1);
        return value;
    }
}
