import { Component } from '@angular/core';
import { IconsService } from './shared/icons.service';
import { TrackingMode } from './shared/tracking/tracking-mode.enum';
import { TrackingService } from './shared/tracking/tracking.service';

@Component({
  selector: 'pfo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private icons: IconsService, private tracking: TrackingService) {
    this.icons.register();
    this.tracking.init(TrackingMode.collectAndSubmit);
  }
}
