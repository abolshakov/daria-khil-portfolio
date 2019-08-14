import { Component } from '@angular/core';
import { ContactsService } from '../shared/contacts.service';

@Component({
  selector: 'pfo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public get instagram(): string {
    return this.contacts.instagram;
  }

  public get skype(): string {
    return this.contacts.skype;
  }

  public get behance(): string {
    return this.contacts.behance;
  }

  constructor(private contacts: ContactsService) { }
}

