import { Injectable } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalOverlayService {
  _timer: Subscription;

  constructor() { }
  public visible = false;

  public show = () => this.visible = true;
  public hide = () => this.visible = false;

  public delayed(onEnd: () => void = () => {}) {
    this.show();
    if (this._timer) {
      this._timer.unsubscribe();
    }
    this._timer = timer(environment.overlayDuration)
    .pipe(
      finalize(() => {
        this.hide();
        onEnd();
      })
    )
    .subscribe();
  }
}

