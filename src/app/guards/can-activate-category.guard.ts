import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Category } from '../shared/gallery/category.enum';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CanActivateCategoryGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        const category = route.params['category'];
        if (!Category[category]) {
            this.router.navigate(['']);
        }
        return true;
    }
}
