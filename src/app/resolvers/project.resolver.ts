import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GalleryService } from '../shared/gallery/gallery.service';
import { Injectable } from '@angular/core';
import { Project } from '../shared/gallery/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<Project> {
    constructor(private gallery: GalleryService) { }

    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Project {
        return this.gallery.project(route.params['project-id']);
    }
}
