import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GalleryService } from '../shared/gallery/gallery.service';
import { Injectable } from '@angular/core';
import { Project } from '../shared/gallery/project.model';

@Injectable({ providedIn: 'root' })
export class CanActivateProjectGuard implements CanActivate {
    constructor(private gallery: GalleryService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        if (!this.currentProject(route)) {
            this.router.navigate(['']);
        }
        return true;
    }

    public currentProject(route: ActivatedRouteSnapshot): Project {
        const id = Number(route.params['project-id']);
        const project = this.gallery.project(id);
        if (isNaN(id) || !project) {
            return null;
        }
        return project;
    }
}
