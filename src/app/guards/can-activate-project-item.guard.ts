import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivateProjectGuard } from './can-activate-project.guard';
import { Injectable } from '@angular/core';
import { ProjectItem } from '../shared/gallery/project-item.model';

@Injectable({ providedIn: 'root' })
export class CanActivateProjectItemGuard implements CanActivate {
    constructor(private router: Router, private projectGuard: CanActivateProjectGuard) { }

    public canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        const item = this.currentItem(route);
        if (!item) {
            this.router.navigate(['']);
        }
        return true;
    }

    public currentItem(route: ActivatedRouteSnapshot): ProjectItem {
        const project = this.projectGuard.currentProject(route);
        if (!project || !project.items || !project.items.length) {
            return null;
        }
        const itemId = Number(route.params['project-item-id']);
        if (isNaN(itemId)) {
            return null;
        }
        const item = project.item(itemId);
        if (!item) {
            return null;
        }

        return item;
    }
}
