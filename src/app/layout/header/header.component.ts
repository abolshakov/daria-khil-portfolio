import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, query, style } from '@angular/animations';
import { filter, map, takeUntil } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';
import { HeaderService } from './shared/header.service';
import { ResizeSensor } from 'css-element-queries';
import { Unsubscribable } from 'src/app/shared/unsubscribable';

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

  private sensor: ResizeSensor;
  private player: AnimationPlayer;
  private docked: boolean;

  public get navigationDocked(): boolean {
    return this.docked;
  }

  public get contentTitle(): Observable<string> {
    return this.service.contentTitle;
  }

  public get contentSubtitle(): Observable<string> {
    return this.service.contentSubtitle;
  }

  private get dockedHeight(): number {
    return this.navRef.nativeElement.getBoundingClientRect().height;
  }

  constructor(
    private builder: AnimationBuilder,
    private service: HeaderService,
    private renderer: Renderer2
  ) {
    super();
  }

  public ngAfterViewInit() {
    this.sensor = new ResizeSensor(this.navBodyRef.nativeElement, () => this.dockNavigation());
    this.player = this.buildFactory().create(this.headerRef.nativeElement);

    this.setDockedHeight();

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.setDockedHeight());

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
    this.sensor.detach();
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
    this.renderer.setStyle(this.navHolderRef.nativeElement, 'height', this.dockedHeight + 'px');
    this.renderer.setStyle(this.navHolderRef.nativeElement, 'display', this.docked ? 'block' : 'none');
  }

  private setDockedHeight() {
    this.service.dockedHeight.next(this.dockedHeight);
  }
}

