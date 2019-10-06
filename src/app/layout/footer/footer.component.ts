import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ContactsService } from '../../shared/contacts/contacts.service';
import { FooterService } from './shared/footer.service';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '../../shared/unsubscribable';

@Component({
  selector: 'pfo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends Unsubscribable implements AfterViewInit {
  @ViewChild('footer', { static: false }) footerRef: ElementRef<HTMLElement>;

  public get instagram(): string {
    return this.contacts.instagram;
  }

  public get skype(): string {
    return this.contacts.skype;
  }

  public get behance(): string {
    return this.contacts.behance;
  }

  private get height(): number {
    const style = window.getComputedStyle(this.footerRef.nativeElement);
    return Number.parseFloat(style.height);
  }

  constructor(private contacts: ContactsService, private footer: FooterService) {
    super();
  }

  public ngAfterViewInit() {
    this.setHeight();

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.setHeight());
  }

  private setHeight() {
    this.footer.height.next(this.height);
  }
}
