import { Component, Input } from '@angular/core';
import { NavigationItem } from '../shared/navigation-item';

@Component({
  selector: 'pfo-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent {
  @Input() item: NavigationItem;

  constructor() { }
}
