import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TrackingEvent } from '../shared/tracking/tracking-event.enum';
import { TrackingService } from '../shared/tracking/tracking.service';

@Directive({
    selector: '[pfoTrack]'
})
export class TrackingEventDirective implements AfterViewInit {
    @Input() public pfoTrack: TrackingEvent;
    @Input() public trackOn = 'click';
    @Input() public trackData: string;
    @Input() public useStepName: boolean;

    constructor(
        private renderer: Renderer2,
        private element: ElementRef,
        private tracking: TrackingService
    ) { }

    public ngAfterViewInit() {
        if (!this.trackOn) {
            throw new Error('The trackOn property is not initialized.');
        }
        this.renderer.listen(this.element.nativeElement, this.trackOn, () => {
            this.tracking.event(this.pfoTrack, this.trackData, this.useStepName);
        });
    }
}
