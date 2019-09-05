import { Size } from './size.model';

export interface ElementInfo {
    size: Size;
    width: number;
    height: number;
    margins: Size;
    clone(): ElementInfo;
}
