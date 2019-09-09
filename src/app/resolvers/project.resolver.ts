import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Project, GalleryService } from '../shared/gallery/gallery.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<Project> {
    constructor(private gallery: GalleryService) { }

    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Project {
        return this.gallery.project(route.params['project-id']);
    }
}
