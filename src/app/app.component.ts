import { Component } from '@angular/core';
import { IconsService } from './shared/icons.service';

@Component({
  selector: 'pfo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public icons: IconsService) {
    this.icons.register();
  }
}
