import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmbedVideoService {
    constructor(private sanitizer: DomSanitizer) { }

    public embed(url: any, options?: any): any {
        let id: string;
        url = new URL(url);

        id = this.detectYoutube(url);
        if (id) {
            return this.embed_youtube(id, options);
        }

        id = this.detectVimeo(url);
        if (id) {
            options.query = { loop: 1, color: 'ffffff', title: 0, byline: 0, portrait: 0, ...options.query }
            return this.embed_vimeo(id, options);
        }

        id = this.detectDailymotion(url);
        if (id) {
            return this.embed_dailymotion(id, options);
        }
    }

    private embed_youtube(id: string, options?: any): string {
        options = this.parseOptions(options);

        return this.sanitize_iframe('<iframe src="https://www.youtube.com/embed/'
            + id + options.query + '"' + options.attr
            + ' frameborder="0"></iframe>');
    }

    private embed_vimeo(id: string, options?: any): string {
        options = this.parseOptions(options);

        return this.sanitize_iframe('<iframe src="https://player.vimeo.com/video/'
            + id + options.query + '"' + options.attr
            + ' frameborder="0"></iframe>');
    }

    private embed_dailymotion(id: string, options?: any): string {
        options = this.parseOptions(options);

        return this.sanitize_iframe('<iframe src="https://www.dailymotion.com/embed/video/'
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
            let temp = <any>[];

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
        let queryString: any = [];

        for (let p in query) {
            if (query.hasOwnProperty(p)) {
                queryString.push(encodeURIComponent(p) + '=' + encodeURIComponent(query[p]));
            }
        }

        return queryString.join('&');
    }

    private sanitize_iframe(iframe: string): any {
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