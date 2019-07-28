import { Component } from '@angular/core';
import { GlobalOverlayService } from '../shared/global-overlay.service';

@Component({
  selector: 'pfo-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  constructor(public overlay: GlobalOverlayService) {
  }
}
