import { Component } from '@angular/core';
import { TrackingService } from '../shared/tracking/tracking.service';

@Component({
  selector: 'pfo-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(public tracking: TrackingService) { }

  public viewResume() {
    window.open('assets/documents/daria-khil-artist-cv.pdf', '_blank');
  }
}
