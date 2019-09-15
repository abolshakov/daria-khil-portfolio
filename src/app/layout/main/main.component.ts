import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { HtmlHelper } from '../../shared/html.helper';
import { MainSectionService } from './shared/main-section.service';
import { takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '../../shared/unsubscribable';

@Component({
  selector: 'pfo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends Unsubscribable implements AfterViewInit {
  @ViewChild('main', { static: false }) mainRef: ElementRef<HTMLElement>;

  constructor(private mainSection: MainSectionService) {
    super();
  }

  public ngAfterViewInit() {
    this.setMargins();

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.setMargins());
  }

  private setMargins() {
    this.mainSection.margins.next(HtmlHelper.margins(this.mainRef.nativeElement));
  }
}

