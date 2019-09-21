import { Component } from '@angular/core';

@Component({
  selector: 'pfo-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor() { }

  public viewResume() {
    window.open('assets/documents/daria-khil-artist-cv.pdf', '_blank');
  }
}
