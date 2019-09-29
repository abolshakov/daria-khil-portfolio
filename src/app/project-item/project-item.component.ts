import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '../layout/header/shared/header.service';
import { of } from 'rxjs';
import { Project } from '../shared/gallery/project.model';
import { ProjectItem } from '../shared/gallery/project-item.model';
import { Unsubscribable } from '../shared/unsubscribable';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'pfo-project-item',
    templateUrl: './project-item.component.html',
    styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent extends Unsubscribable implements OnInit, OnDestroy {
    private _prev?: number;
    private _next?: number;

    public get project(): Project {
        return this.route.snapshot.data['project'];
    }

    public get projectItem(): ProjectItem {
        return this.route.snapshot.data['projectItem'];
    }

    public get prev(): number {
        return this._prev;
    }

    public get next(): number {
        return this._next;
    }

    constructor(
        private header: HeaderService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        super();
    }

    public ngOnInit() {
        this.route.params
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => this.initialize());
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.header.titleProvider = null;
        this.header.subtitleProvider = null;
    }

    public openProjectItem(projectItemIndex: number): void {
        if (projectItemIndex < 0 || projectItemIndex >= this.project.items.length) {
            return;
        }
        const itemId = this.project.items[projectItemIndex].id;
        const url = this.router.url.replace(`/${this.projectItem.id}`, `/${itemId}`);
        this.router.navigate([url], { replaceUrl: true });
    }

    private initialize() {
        this.header.titleProvider = of(this.project.title);
        this.header.subtitleProvider = of(this.projectItem.description);

        const ids = this.project.items.map(x => x.id);
        const index = ids.indexOf(this.projectItem.id);
        this._prev = index > 0 ? index - 1 : null;
        this._next = index >= 0 && index < ids.length - 1 ? index + 1 : null;
    }
}
