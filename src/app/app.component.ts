import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'pfo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  private registerIcons() {
    this.addSvgIcon('behance', '../assets/icons/behance.svg');
    this.addSvgIcon('instagram', '../assets/icons/instagram.svg');
    this.addSvgIcon('skype', '../assets/icons/skype.svg');
    this.addSvgIcon('mail', '../assets/icons/mail.svg');
  }

  private addSvgIcon(name: string, path: string) {
    this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
