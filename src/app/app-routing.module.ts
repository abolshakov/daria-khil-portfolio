import { CanActivateProjectGuard } from './guards/can-activate-project.guard';
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
import { ProjectComponent } from './project/project.component';
import { ShellComponent } from './shell/shell.component';
import { CanActivateCategoryGuard } from './guards/can-activate-category.guard';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'projects',
        component: GalleryComponent
      },
      {
        path: 'projects/:id',
        component: ProjectComponent,
        canActivate: [CanActivateProjectGuard],
      },
      {
        path: 'projects/categories/:category',
        component: GalleryComponent,
        canActivate: [CanActivateCategoryGuard]
      },
      {
        path: 'projects/categories/:category/:id',
        component: ProjectComponent,
        canActivate: [CanActivateCategoryGuard, CanActivateProjectGuard],
      },
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
    navigationRegistry.register(2, '/projects/categories/concept', NavigationArea.Concept, 'Concept art', 'My visual deveolpment');
    navigationRegistry.register(3, '/projects/categories/illustration', NavigationArea.Illustration, 'Illustration', 'My illustrations');
    navigationRegistry.register(4, '/projects/categories/animation', NavigationArea.Animation, 'Animation', 'My animations');
    navigationRegistry.register(5, '/contacts', NavigationArea.Contact, 'Contact', 'Contact me');

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.navigationRegistry.setCurrent(window.location.pathname));
  }
}
