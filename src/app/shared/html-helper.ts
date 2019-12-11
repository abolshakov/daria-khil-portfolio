import { Size } from './size-model';

export class HtmlHelper {
    public static margins(element: HTMLElement) {
        const style = window.getComputedStyle(element);
        const width = Number.parseFloat(style.marginLeft) + Number.parseFloat(style.marginRight);
        const height = Number.parseFloat(style.marginTop) + Number.parseFloat(style.marginBottom);

        return new Size(width, height);
    }

    public static getScrollbarWidth(): number {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);

        return scrollbarWidth;
    }
}
