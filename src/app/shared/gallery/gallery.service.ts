import { Injectable } from '@angular/core';
import { PORTFOLIO } from './portfolio';
import { Project } from './project.model';
import { ProjectItem } from './project-item.model';

@Injectable({ providedIn: 'root' })
export class GalleryService {
    private readonly imagesPath = 'assets/images/portfolio/';
    private readonly blankImagePath = 'assets/images/app/blank.png';
    private readonly projects: Project[] = [];
    private readonly projectsMap = new Map<number, Project>();

    public get portfolio(): Project[] {
        return this.projects;
    }

    constructor() {
        for (const projectLike of PORTFOLIO) {

            const items: ProjectItem[] = [];
            for (const itemLike of projectLike.items) {
                const item = itemLike as ProjectItem;
                const projectItem = new ProjectItem(
                    item.id,
                    item.image,
                    item.margin,
                    item.description,
                    item.url,
                    item.video
                );
                if (projectItem.image) {
                    projectItem.image = this.imagesPath + projectItem.image;
                } else {
                    projectItem.image = this.blankImagePath;
                }
                items.push(projectItem);
            }

            const project = new Project(
                projectLike.id,
                projectLike.title,
                projectLike.image,
                projectLike.description,
                projectLike.category,
                items
            );
            if (project.image) {
                project.image = this.imagesPath + project.image;
            }

            this.projectsMap.set(project.id, project);
        }
        this.projects = Array.from(this.projectsMap.values());
    }

    public project(id: number | string): Project {
        return this.projectsMap.get(Number(id));
    }
}
