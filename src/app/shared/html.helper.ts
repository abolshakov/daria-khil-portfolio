import { Size } from './size-model';

export class HtmlHelper {
    public static margins(element: HTMLElement) {
        const style = window.getComputedStyle(element);
        const width = Number.parseFloat(style.marginLeft) + Number.parseFloat(style.marginRight);
        const height = Number.parseFloat(style.marginTop) + Number.parseFloat(style.marginBottom);
        return new Size(width, height);
      }
}
