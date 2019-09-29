import { ProjectItem } from './project-item.model';

export class Project {
    private readonly projectItemsMap = new Map<number, ProjectItem>();

    constructor(
        public id?: number,
        public title?: string,
        public image?: string,
        public description?: string,
        public category?: string,
        public items?: ProjectItem[]
    ) {
        for (const item of items) {
            this.projectItemsMap.set(item.id, item);
        }
    }

    public item(id: number | string): ProjectItem {
        return this.projectItemsMap.get(Number(id));
    }
}
