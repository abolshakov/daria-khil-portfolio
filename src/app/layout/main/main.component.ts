import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { HtmlHelper } from '../../shared/html.helper';
import { MainSectionService } from './shared/main-section.service';
import { ResizeSensor } from 'css-element-queries';

@Component({
  selector: 'pfo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit, OnDestroy {
  @ViewChild('main', { static: false }) mainRef: ElementRef<HTMLElement>;

  private sensor: ResizeSensor;

  constructor(private mainSection: MainSectionService) {
  }

  public ngAfterViewInit() {
    this.sensor = new ResizeSensor(this.mainRef.nativeElement, () => this.setMargins());
  }

  private setMargins() {
    this.mainSection.margins.next(HtmlHelper.margins(this.mainRef.nativeElement));
  }

  public ngOnDestroy() {
    this.sensor.detach();
  }
}
