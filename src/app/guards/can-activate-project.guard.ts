import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { GalleryService } from '../shared/gallery/gallery.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CanActivateProjectGuard implements CanActivate {
    constructor(private gallery: GalleryService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        const id = Number(route.params['project-id']);
        if (isNaN(id) || !this.gallery.project(id)) {
            this.router.navigate(['']);
        }
        return true;
    }
}
