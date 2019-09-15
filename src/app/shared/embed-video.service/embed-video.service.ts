import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmbedVideoService {
    constructor(private sanitizer: DomSanitizer) { }

    public embed(link: string, options: any = {}): string {
        const url = new URL(link);

        let id = this.detectYoutube(url);
        if (id) {
            return this.embedYouYube(id, options);
        }

        id = this.detectVimeo(url);
        if (id) {
            options.query = { loop: 1, color: 'ffffff', title: 0, byline: 0, portrait: 0, ...options.query };
            return this.embedVimeo(id, options);
        }

        id = this.detectDailymotion(url);
        if (id) {
            return this.embedDailyMotion(id, options);
        }

        return null;
    }

    private embedYouYube(id: string, options?: any): string {
        options = this.parseOptions(options);

        return this.sanitizeIframe('<iframe src="https://www.youtube.com/embed/'
            + id + options.query + '"' + options.attr
            + ' frameborder="0"></iframe>');
    }

    private embedVimeo(id: string, options?: any): string {
        options = this.parseOptions(options);

        return this.sanitizeIframe('<iframe src="https://player.vimeo.com/video/'
            + id + options.query + '"' + options.attr
            + ' frameborder="0"></iframe>');
    }

    private embedDailyMotion(id: string, options?: any): string {
        options = this.parseOptions(options);

        return this.sanitizeIframe('<iframe src="https://www.dailymotion.com/embed/video/'
            + id + options.query + '"' + options.attr
            + ' frameborder="0"></iframe>');
    }

    private parseOptions(options: any): any {
        let queryString = '',
            attributes = '';

        if (options && options.hasOwnProperty('query')) {
            queryString = '?' + this.serializeQuery(options.query);
        }

        if (options && options.hasOwnProperty('attr')) {
            const temp = <any>[];

            Object.keys(options.attr).forEach(function (key) {
                temp.push(key + '="' + (options.attr[key]) + '"');
            });

            attributes = ' ' + temp.join(' ');
        }
        return {
            query: queryString,
            attr: attributes
        };
    }

    private serializeQuery(query: any): any {
        const queryString: any = [];

        for (const p in query) {
            if (query.hasOwnProperty(p)) {
                queryString.push(encodeURIComponent(p) + '=' + encodeURIComponent(query[p]));
            }
        }

        return queryString.join('&');
    }

    private sanitizeIframe(iframe: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(iframe);
    }

    private detectVimeo(url: any): string {
        return (url.hostname === 'vimeo.com') ? url.pathname.split('/')[1] : null;
    }

    private detectYoutube(url: any): string {
        if (url.hostname.indexOf('youtube.com') > -1) {
            return url.search.split('=')[1];
        }

        if (url.hostname === 'youtu.be') {
            return url.pathname.split('/')[1];
        }

        return '';
    }

    private detectDailymotion(url: any): string {
        if (url.hostname.indexOf('dailymotion.com') > -1) {
            return url.pathname.split('/')[2].split('_')[0];
        }

        if (url.hostname === 'dai.ly') {
            return url.pathname.split('/')[1];
        }

        return '';
    }
}
