import { Category } from './shared/gallery/category.enum';
import { filter } from 'rxjs/operators';
import { GalleryComponent } from './gallery/gallery.component';
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
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'projects', component: GalleryComponent },
      { path: 'projects/concepts', component: GalleryComponent, data: { filter: Category.concept } },
      { path: 'projects/illustrations', component: GalleryComponent, data: { filter: Category.illustation } },
      { path: 'projects/animations', component: GalleryComponent, data: { filter: Category.animation } },
      { path: 'contacts', component: KeepInTouchComponent }
    ]
  },

  // Handle all other routes
  { path: '**', redirectTo: 'projects' }
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
    navigationRegistry.register(1, '/projects', NavigationArea.Home, 'All projects', 'My projects');
    navigationRegistry.register(2, '/projects/concepts', NavigationArea.Concept, 'Concept art', 'My visual deveolpment');
    navigationRegistry.register(3, '/projects/illustrations', NavigationArea.Illustration, 'Illustration', 'My illustrations');
    navigationRegistry.register(4, '/projects/animations', NavigationArea.Animation, 'Animation', 'My animations');
    navigationRegistry.register(5, '/contacts', NavigationArea.Contact, 'Contact', 'Contact me');

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.navigationRegistry.setCurrent(window.location.pathname));
  }
}
