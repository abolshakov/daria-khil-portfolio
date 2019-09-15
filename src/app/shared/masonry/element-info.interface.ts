import { RateableSize } from './rateable-size.model';

export interface ElementInfo {
    size: RateableSize;
    width: number;
    height: number;
    margins: RateableSize;
    clone(): ElementInfo;
}
