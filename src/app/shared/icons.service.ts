import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class IconsService {

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) { }

    public register() {
        this.fromSvg('behance', '../assets/icons/behance.svg');
        this.fromSvg('instagram', '../assets/icons/instagram.svg');
        this.fromSvg('skype', '../assets/icons/skype.svg');
        this.fromSvg('mail', '../assets/icons/mail.svg');
        this.fromSvg('arrow_back', '../assets/icons/arrow_back.svg');
        this.fromSvg('arrow_forward', '../assets/icons/arrow_forward.svg');
        this.fromSvg('play', '../assets/icons/play_circle.svg');
    }

    private fromSvg(name: string, path: string) {
        this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(path));
    }
}
