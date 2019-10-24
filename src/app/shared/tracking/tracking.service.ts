import { environment } from '../../../environments/environment';
import { filter } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { MathService } from '../math.service';
import { NavigationEnd, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { TrackingEvent } from './tracking-event.enum';
import { TrackingMode } from './tracking-mode.enum';

export interface TrackingEventInfo {
    action: TrackingEvent;
    data: string;
    step: string;
    timeStamp: number;
}

type Action = () => void;

@Injectable()
export class TrackingService {
    private readonly deferredKey = 'deferredTrackingEvent';
    private readonly reloadTimeout = 60 * 1000;
    private readonly ignoreOnReload = [
    ];

    private isReload: boolean;
    private beforeUnloadListener = this.beforeUnloadHandler.bind(this);
    private _mode: TrackingMode;
    private enabled: boolean;
    private pendingActions = new Array<Action>();

    public readonly keys = TrackingEvent;   // convenient property to access enum values in templates

    public event$ = new ReplaySubject<TrackingEventInfo>();
    public navigation$ = new ReplaySubject<string>();
    public exception$ = new ReplaySubject<string>();

    private get stepName(): string {
        return window.location.pathname.substr(1);
    }

    public get mode(): TrackingMode {
        return this._mode;
    }

    public set mode(value: TrackingMode) {
        if (!this.enabled || this._mode === value) {
            return;
        }
        this._mode = value;
        if (value === TrackingMode.collectAndSubmit) {
            this.processPendingActions();
        }
    }

    constructor(private injector: Injector, private math: MathService) { }

    public init(mode: TrackingMode) {
        if (environment.enableTracking) {
            this.enabled = true;
            this.mode = mode;
            this.processDeferredEvent();
            this.subscribeRouteChanges();
            this.subscribeWindowCloses();
        }
    }

    public event(action: TrackingEvent, data: string | any, useStepName: boolean = false) {
        if (!this.enabled ||
            this.isReload && this.ignoreOnReload.find(x => x === action)) {
            return;
        }
        const event = {
            action: action,
            data: typeof (data) === 'string' ? data : this.toString(data),
            step: useStepName ? this.stepName : null,
            timeStamp: new Date().getTime()
        };
        switch (action) {
            case TrackingEvent.userDropOff:
                this.unsubscribeWindowCloses();
                this.setDeferredEvent(event);
                break;
            default:
                this.executeOrPostpone(() => this.event$.next(event));
                break;
        }
    }

    public exception(err: string) {
        if (this.enabled) {
            this.executeOrPostpone(() => this.exception$.next(err));
        }
    }

    private processDeferredEvent() {
        const event = this.getDeferredEvent();
        if (!event) {
            return;
        }
        this.removeDeferredEvent();
        if (new Date().getTime() - event.timeStamp <= this.reloadTimeout) {
            this.isReload = true;
            return; // ignore window reload events
        }
        this.executeOrPostpone(() => this.event$.next(event));
    }

    private subscribeRouteChanges() {
        this.injector.get(Router).events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => {
                if (this.enabled) {
                    this.executeOrPostpone(() => this.navigation$.next(e.urlAfterRedirects));
                }
            });
    }

    private getDeferredEvent(): TrackingEventInfo {
        const item = localStorage.getItem(this.deferredKey);
        return item ? JSON.parse(item) : null;
    }

    private setDeferredEvent(item: TrackingEventInfo) {
        localStorage.setItem(this.deferredKey, JSON.stringify(item));
    }

    private removeDeferredEvent() {
        localStorage.removeItem(this.deferredKey);
    }

    private beforeUnloadHandler() {
        this.event(TrackingEvent.userDropOff, 'window close', true);
    }

    private subscribeWindowCloses() {
        window.addEventListener('beforeunload', this.beforeUnloadListener);
    }

    private unsubscribeWindowCloses() {
        window.removeEventListener('beforeunload', this.beforeUnloadListener);
    }

    private executeOrPostpone(action: Action) {
        if (this.mode === TrackingMode.collectAndSubmit) {
            action();
        } else {
            this.pendingActions.push(action);
        }
    }

    private processPendingActions() {
        while (this.pendingActions.length) {
            const action = this.pendingActions.shift();
            action();
        }
    }

    private toString(value: any): string {
        if (!value) {
            return value;
        }
        return JSON.stringify(value, (_k, v) => this.replacer(v))
            .replace(/\\"/g, '\\`')                     // removes extra text and quotes
            .replace(/"value":|,"unit":|["{}]/gi, '')   // but preserves quotes inside values
            .replace(/\\`/g, '"')
            .replace(/,/g, ';');
    }

    private replacer(value: any): any {
        if (value === null) {
            return undefined;                           // exclude properties with null values
        }
        return typeof value !== 'number' ? value : this.math.ceil(value, 4);
    }
}

