import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    CanActivate
    } from '@angular/router';
import { GalleryService } from '../shared/gallery/gallery.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CanActivateProjectItemGuard implements CanActivate {
    constructor(private gallery: GalleryService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        const projectId = Number(route.params['project-id']);
        const itemId = Number(route.params['project-item-id']);
        if (isNaN(projectId) || isNaN(itemId)) {
            this.router.navigate(['']);
        }
        const project = this.gallery.project(projectId);
        if (!project || !project.items || !project.items.length) {
            this.router.navigate(['']);
        }
        const item = project.items.find(x => x.id === itemId);
        if (!item) {
            this.router.navigate(['']);
        }
        return true;
    }
}
