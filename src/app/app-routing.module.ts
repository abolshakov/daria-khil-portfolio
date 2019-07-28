import { GalleryComponent } from './gallery/gallery';
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
      {
        path: 'home', component: GalleryComponent
      }
    ]
  },

  // Handle all other routes
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router, private navigationRegistry: NavigationRegistryService) {
    navigationRegistry.register(1, '/home', NavigationArea.Home, 'All projects', 'My projects');
    navigationRegistry.register(2, '/concept', NavigationArea.Concept, 'Concept art', 'My visual deveolpment');
    navigationRegistry.register(3, '/illustration', NavigationArea.Illustration, 'Illustration', 'My illustrations');
    navigationRegistry.register(4, '/animation', NavigationArea.Animation, 'Animation', 'My animations');
    navigationRegistry.register(5, '/about', NavigationArea.Animation, 'About', 'About me');
    navigationRegistry.register(6, '/contact', NavigationArea.Contact, 'Contact', 'Contact me');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.navigationRegistry.setCurrent(window.location.pathname);
      }
    });
  }
}
