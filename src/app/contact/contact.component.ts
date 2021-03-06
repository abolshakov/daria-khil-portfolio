import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ComparerService } from '../shared/comparer.service';
import { ContactsService } from '../shared/contacts/contacts.service';
import { FormBuilder, Validators } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { Letter } from '../shared/contacts/letter.model';
import { markAllAsTouched } from '../shared/validation';
import { SnackBarService } from '../shared/snack-bar.service';
import { Unsubscribable } from '../shared/unsubscribable';

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
        takeUntil(this.unsubscribe),
        debounceTime(this.debounceTime),
        tap(() => {
          this._hasErrors = !this.form.valid;
          markAllAsTouched(this.form);
        }),
        filter(() => this.form.valid),
        distinctUntilChanged(ComparerService.byAllFields),
        switchMap((value: Letter) => this.contacts.sendEmail(value)
          .pipe(
            take(1),
            catchError(() => {
              this.snack.error(['Sorry, an error has happened sending the message.', 'Please try again later.']);
              return of();
            }))
        )
      )
      .subscribe(() => {
        this.form.setValue(new Letter());
        this.form.markAsUntouched();
        this.snack.info(['The message has been successfully sent.', 'Thank you!']);
      });
  }
}
