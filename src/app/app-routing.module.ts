import { Category } from './gallery-items/category.enum';
import { filter } from 'rxjs/operators';
import { GalleryComponent } from './gallery/gallery';
import { KeepInTouchComponent } from './keep-in-touch/keep-in-touch.component';
import { KeepInTouchModule } from './keep-in-touch/keep-in-touch.module';
import { MatRippleModule } from '@angular/material';
import { NavigationArea } from './navigation/shared/navigation-area.enum';
import {
  NavigationEnd,
  Router,
  RouterModule,
  Routes
  } from '@angular/router';
import { NavigationRegistryService } from './navigation/shared/navigation-registry.service';
import { NgModule } from '@angular/core';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'home', component: GalleryComponent },
      { path: 'concept', component: GalleryComponent, data: { filter: Category.concept } },
      { path: 'illustration', component: GalleryComponent, data: { filter: Category.illustation } },
      { path: 'animation', component: GalleryComponent, data: { filter: Category.animation } },
      { path: 'contact', component: KeepInTouchComponent }
    ]
  },

  // Handle all other routes
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    KeepInTouchModule,
    MatRippleModule,
    RouterModule.forRoot(
      routes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(
    private router: Router,
    private navigationRegistry: NavigationRegistryService
  ) {
    navigationRegistry.register(1, '/home', NavigationArea.Home, 'All projects', 'My projects');
    navigationRegistry.register(2, '/concept', NavigationArea.Concept, 'Concept art', 'My visual deveolpment');
    navigationRegistry.register(3, '/illustration', NavigationArea.Illustration, 'Illustration', 'My illustrations');
    navigationRegistry.register(4, '/animation', NavigationArea.Animation, 'Animation', 'My animations');
    navigationRegistry.register(5, '/contact', NavigationArea.Contact, 'Contact', 'Contact me');

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.navigationRegistry.setCurrent(window.location.pathname));
  }
}
