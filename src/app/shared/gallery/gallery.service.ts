import { Injectable } from '@angular/core';
import { PORTFOLIO } from './portfolio';

export interface PortfolioItem {
    title?: string;
    image?: string;
    description?: string;
    category?: string;
    projectItems?: ProjectItem[];
}

export interface ProjectItem {
    image?: string;
    margin?: string;
    description?: string;
    url?: string;
    video?: string;
}

@Injectable({ providedIn: 'root' })
export class GalleryService {
    private readonly imagesPath = '../assets/images/portfolio/';

    get portfolio(): PortfolioItem[] {
        return PORTFOLIO;
    }

    constructor() {
        for (const portfolioItem of PORTFOLIO as PortfolioItem[]) {
            if (portfolioItem.image) {
                portfolioItem.image = this.imagesPath + portfolioItem.image;
            }

            if (!portfolioItem.projectItems) {
                continue;
            }

            for (const projectItem of portfolioItem.projectItems) {
                if (projectItem.image) {
                    projectItem.image = this.imagesPath + projectItem.image;
                }
            }
        }
    }
}
