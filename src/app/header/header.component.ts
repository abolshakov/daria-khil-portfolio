import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild
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
  @ViewChild('header', { static: false }) headerRef: ElementRef<HTMLElement>;
  @ViewChild('title', { static: false }) titleRef: ElementRef<HTMLElement>;
  @ViewChild('nav', { static: false }) navRef: ElementRef<HTMLElement>;
  @ViewChild('navbody', { static: false }) navBodyRef: ElementRef<HTMLElement>;
  @ViewChild('navholder', { static: false }) navHolderRef: ElementRef<HTMLElement>;
  @ViewChild('decor', { static: false }) decorRef: ElementRef<HTMLElement>;
  @ViewChild('pattern', { static: false }) patternRef: ElementRef<HTMLElement>;

  private navSensor: ResizeSensor;
  private player: AnimationPlayer;
  private docked: boolean;

  public get navigationDocked(): boolean {
    return this.docked;
  }

  public get contentTitle(): string {
    return this.navigation.CurrentItem.description;
  }

  constructor(
    private builder: AnimationBuilder,
    private navigation: NavigationRegistryService,
    private renderer: Renderer2
  ) {
    super();
  }

  public ngAfterViewInit() {
    this.navSensor = new ResizeSensor(this.navBodyRef.nativeElement, () => this.dockNavigation());
    this.player = this.buildFactory().create(this.headerRef.nativeElement);

    fromEvent(window, 'scroll')
      .pipe(
        takeUntil(this.unsubscribe),
        map(() => window.pageYOffset),
        filter(y => y <= this.headerRef.nativeElement.clientHeight),
      )
      .subscribe(y => {
        this.play(y / this.headerRef.nativeElement.clientHeight);
        this.dockNavigation();
      });
  }

  public ngOnDestroy() {
    this.navSensor.detach();
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
    this.renderer.setStyle(this.navHolderRef.nativeElement, 'height', this.navRef.nativeElement.getBoundingClientRect().height + 'px');
    this.renderer.setStyle(this.navHolderRef.nativeElement, 'display', this.docked ? 'block' : 'none');
  }
}

