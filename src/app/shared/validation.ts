import * as _ from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';

export function markAllAsTouched(formGroup: FormGroup) {
  _.each(formGroup.controls, (control: FormGroup) => {
    if (control instanceof FormControl) {
      control.markAsTouched();
    } else if (control instanceof FormGroup) {
      markAllAsTouched(control);
    }
  });
}
