import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProjectItem } from '../shared/gallery/project-item.model';
import { RateableSize } from '../shared/masonry/rateable-size.model';
import { ShellService } from '../layout/shell/shared/shell.service';
import { Size } from '../shared/size-model';
import { Unsubscribable } from '../shared/unsubscribable';

export abstract class AbstractMediaView extends Unsubscribable {
    protected get projectItem(): ProjectItem {
        return this.route.snapshot.data['projectItem'];
    }

    protected get maxVisibleSize(): Observable<Size> {
        return this.shell.maxVisibleSize.pipe(
            map(value => {
                return new Size(value.width, value.height);
            })
        );
    }

    constructor(protected shell: ShellService, protected route: ActivatedRoute) {
        super();
    }

    protected fitSize(to: Size, from: RateableSize): Size {
        const result = new RateableSize(from.width, from.height);
        if (from.width > from.height) {
            result.height = to.height;
            if (result.width > to.width) {
                result.width = to.width;
            }
        } else {
            result.width = to.width;
            if (result.height > to.height) {
                result.height = to.height;
            }
        }
        return result;
    }
}
