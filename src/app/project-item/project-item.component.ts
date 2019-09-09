import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '../header/shared/header.service';
import { Project, ProjectItem } from '../shared/gallery/gallery.service';
import { Unsubscribable } from '../shared/unsubscribable';
import {
    of,
} from 'rxjs';
import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { EmbedVideoService } from '../shared/embed-video.service/embed-video.service';

@Component({
    selector: 'pfo-project-item',
    templateUrl: './project-item.component.html',
    styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent extends Unsubscribable implements OnInit, OnDestroy {
    @ViewChild('container', { static: true }) containerRef: ElementRef<HTMLElement>;

    public cssClass: any;

    public get project(): Project {
        return this.route.snapshot.data['project'];
    }

    public get projectItem(): ProjectItem {
        return this.route.snapshot.data['projectItem'];
    }

    public get imageSource(): string {
        return this.projectItem.image;
    }

    public get videoHtml(): any {
        return this.projectItem.video
            ? this.video.embed(this.projectItem.video, {
                attr: {
                    width: this.contentWidth,
                    height: this.contentWidth / (16 / 9)
                }
            })
            : null;
    }

    public get contentWidth(): number {
        return this.containerRef.nativeElement.clientWidth;
    }

    constructor(
        private header: HeaderService,
        private route: ActivatedRoute,
        private video: EmbedVideoService
    ) {
        super();
    }

    public ngOnInit() {
        this.cssClass = {
            'image': true,
            'clickable': this.projectItem.url != null
        };
        this.header.TitleProvider = of(this.project.title);
        this.header.SubtitleProvider = of(this.projectItem.description);
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.header.TitleProvider = null;
        this.header.SubtitleProvider = null;
    }

    public onContentClick(): void {
        if (!this.projectItem.url) {
            return;
        }
        const win = window.open(this.projectItem.url, '_blank');
        win.focus();
    }
}
