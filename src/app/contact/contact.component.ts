import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ComparerService } from '../shared/comparer.service';
import { ContactsService, Letter } from '../shared/contacts.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
  catchError,
  take
} from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { markAllAsTouched } from '../shared/validation';
import { Unsubscribable } from '../shared/unsubscribable';
import { SnackBarService } from '../shared/snack-bar.service';

@Component({
  selector: 'pfo-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends Unsubscribable implements AfterViewInit {
  private debounceTime = 100;
  private _hasErrors = false;

  @ViewChild('submit', { static: false, read: ElementRef }) buttonRef: ElementRef;

  public get instagram(): string {
    return this.contacts.instagram;
  }

  public get behance(): string {
    return this.contacts.behance;
  }

  public get hasErrors(): boolean {
    return this._hasErrors;
  }

  public form = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    subject: [null, [Validators.required]],
    message: [null, [Validators.required]]
  });

  constructor(
    private contacts: ContactsService,
    private fb: FormBuilder,
    private snack: SnackBarService
  ) {
    super();
  }

  ngAfterViewInit() {
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        if (this._hasErrors) {
          this._hasErrors = !this.form.valid;
        }
      });

    fromEvent(this.buttonRef.nativeElement, 'click')
      .pipe(
        debounceTime(this.debounceTime),
        tap(() => {
          this._hasErrors = !this.form.valid;
          markAllAsTouched(this.form);
        }),
        filter(() => this.form.valid),
        switchMap(() => of(this.form.value)),
        distinctUntilChanged(ComparerService.byAllFields),
        takeUntil(this.unsubscribe)
      )
      .subscribe((value: Letter) => this.contacts.sendEmail(value)
        .pipe(
          take(1),
          catchError(() => {
            this.snack.error(['Sorry, an error has happened sending the message.', 'Please try again later.']);
            return of();
          }))
        .subscribe(() => {
          this.form.setValue({});
          this.snack.info(['The message has been successfully sent.', 'Thank you!']);
        }));
  }
}
