import { Injectable } from '@angular/core';
import { PORTFOLIO } from './portfolio';

export interface PortfolioItem {
    id?: number;
    title?: string;
    image?: string;
    description?: string;
    category?: string;
    projectItems?: ProjectItem[];
}

export interface ProjectItem {
    id?: number;
    image?: string;
    margin?: string;
    description?: string;
    url?: string;
    video?: string;
}

@Injectable({ providedIn: 'root' })
export class GalleryService {
    private readonly imagesPath = '../assets/images/portfolio/';
    private readonly projects = new Map<number, PortfolioItem>();

    public get portfolio(): PortfolioItem[] {
        return PORTFOLIO;
    }

    constructor() {
        for (const project of this.portfolio) {
            this.projects.set(project.id, project);

            if (project.image) {
                project.image = this.imagesPath + project.image;
            }

            if (!project.projectItems) {
                continue;
            }

            for (const item of project.projectItems) {
                if (item.image) {
                    item.image = this.imagesPath + item.image;
                }
            }
        }
    }

    public project(id: number | string): PortfolioItem {
        return this.projects.get(Number(id));
    }
}
