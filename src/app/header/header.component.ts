import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  query,
  style
} from '@angular/animations';
import { filter, map, takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ResizeSensor } from 'css-element-queries';
import { Unsubscribable } from '../shared/unsubscribable';

@Component({
  selector: 'pfo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends Unsubscribable implements AfterViewInit, OnDestroy {
  @ViewChild('header', { static: true }) header: ElementRef<HTMLElement>;
  @ViewChild('title', { static: true }) title: ElementRef<HTMLElement>;
  @ViewChild('decor', { static: true }) decor: ElementRef<HTMLElement>;
  @ViewChild('pattern', { static: true }) pattern: ElementRef<HTMLElement>;

  private sensor: ResizeSensor;
  private player: AnimationPlayer;
  private docked: boolean;

  public get navigationDocked(): boolean {
    return this.docked;
  }

  constructor(private builder: AnimationBuilder) {
    super();
  }

  ngAfterViewInit() {
    this.sensor = new ResizeSensor(this.header.nativeElement, () => this.dockNavigation());
    this.player = this.buildFactory().create(this.header.nativeElement);

    fromEvent(window, 'scroll')
      .pipe(
        takeUntil(this.unsubscribe),
        map(() => window.pageYOffset),
        filter(y => y <= this.header.nativeElement.clientHeight),
      )
      .subscribe(y => {
        this.play(y / this.header.nativeElement.clientHeight);
        this.dockNavigation();
      });
  }

  private buildFactory(): AnimationFactory {
    const margin = this.pattern.nativeElement.clientHeight - this.decor.nativeElement.clientHeight;

    return this.builder.build([
      query('.pattern', [
        style({ transform: '*' }),
        animate(1000, style({ transform: `translateY(${margin}px)` }))
      ])
    ]);
  }

  private play(position: number) {
    this.player.pause();
    this.player.setPosition(position);
  }

  private dockNavigation() {
    this.docked = this.title.nativeElement.getBoundingClientRect().bottom < 0;
  }

  public ngOnDestroy() {
    this.sensor.detach();
  }
}

