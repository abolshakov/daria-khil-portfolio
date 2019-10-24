import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { TrackingEvent } from './tracking-event.enum';
import { TrackingEventInfo, TrackingService } from './tracking.service';

export function initGtagService(g: GtagService) {
    return () => new Promise((resolve) => {
        g.init();
        resolve();
    });
}

@Injectable()
export class GtagService {
    constructor(private tracking: TrackingService) { }

    public init() {
        if (!environment.enableTracking) {
            return;
        }
        try {
            this.loadTagScriptAsync();
            this.setupTagScript();

            this.tracking.navigation$.subscribe((url: string) => this.navigation(url));
            this.tracking.event$.subscribe((e: TrackingEventInfo) => this.event(e));
            this.tracking.exception$.subscribe((err: string) => this.exception(err));
        } catch (ex) {
            console.error('Error initializing Global Tag service.');
        }
    }

    private navigation(url: string) {
        gtag('config', environment.tracking.gtag.id, { 'page_path': url });
    }

    private event(info: TrackingEventInfo) {
        switch (info.action) {
            case TrackingEvent.userDropOff:
                break;
            default:
                gtag('event', info.action, {
                    event_category: 'retention',
                    event_label: info.step
                        ? (info.data ? `${info.step}/${info.data}` : info.step)
                        : info.data
                });
        }
    }

    private exception(err: string) {
        gtag('event', 'exception', { description: err });
    }

    private set(config: Gtag.CustomParams) {
        gtag('set', config);
    }

    private loadTagScriptAsync() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = `${environment.tracking.gtag.src}?id=${environment.tracking.gtag.id}`;
        document.head.appendChild(script);
    }

    private setupTagScript() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML =
            `window.dataLayer = window.dataLayer || [];\n` +
            `function gtag(){dataLayer.push(arguments);}\n` +
            `gtag('js', new Date());\n` +
            `gtag('config', '${environment.tracking.gtag.id}', {'send_page_view': false, 'anonymize_ip': true});`;
        document.head.appendChild(script);
    }
}
