import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GalleryService, ProjectItem } from '../shared/gallery/gallery.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProjectItemResolver implements Resolve<ProjectItem> {
    constructor(private gallery: GalleryService) { }

    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): ProjectItem {
        const itemId = parseInt(route.params['project-item-id'], 10);
        const item = this.gallery.project(route.params['project-id']).items.find(x => x.id === itemId);
        return item;
    }
}
