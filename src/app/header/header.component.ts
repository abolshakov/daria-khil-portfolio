import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  EventEmitter
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
import { NavigationRegistryService } from '../navigation/shared/navigation-registry.service';
import { ResizeSensor } from 'css-element-queries';
import { Unsubscribable } from '../shared/unsubscribable';

@Component({
  selector: 'pfo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends Unsubscribable implements AfterViewInit, OnDestroy {
  @ViewChild('header', { static: false }) header: ElementRef<HTMLElement>;
  @ViewChild('title', { static: false }) titleRef: ElementRef<HTMLElement>;
  @ViewChild('decor', { static: false }) decorRef: ElementRef<HTMLElement>;
  @ViewChild('pattern', { static: false }) patternRef: ElementRef<HTMLElement>;

  private sensor: ResizeSensor;
  private player: AnimationPlayer;
  private docked: boolean;


  public get navigationDocked(): boolean {
    return this.docked;
  }

  public get contentTitle(): string {
    return this.navigation.CurrentItem.description;
  }

  constructor(private builder: AnimationBuilder, private navigation: NavigationRegistryService) {
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
    const margin = this.patternRef.nativeElement.clientHeight - this.decorRef.nativeElement.clientHeight;

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
    this.docked = this.titleRef.nativeElement.getBoundingClientRect().bottom < 0;
  }

  public ngOnDestroy() {
    this.sensor.detach();
  }
}

