import {Component, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {RecaptchaComponent} from 'ng-recaptcha';

let nextId = 0;

@Component({
  selector: 'ii-re-captcha',
  templateUrl: './re-captcha.component.html',
  styleUrls: ['./re-captcha.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReCaptchaComponent),
      multi: true
    }
  ]
})
export class ReCaptchaComponent implements ControlValueAccessor {

  @Input() id = `ngrecaptcha-${nextId++}`;
  @Input() siteKey?: string;
  @Input() theme?: ReCaptchaV2.Theme;
  @Input() type?: ReCaptchaV2.Type;
  @Input() size?: ReCaptchaV2.Size;
  @Input() tabIndex?: number;
  @Input() badge?: ReCaptchaV2.Badge;

  private onChange?: (value: string) => void;
  private onTouched?: () => void;

  @ViewChild(RecaptchaComponent, {
    static: true
  }) private host !: RecaptchaComponent;

  constructor() {
  }

  public writeValue(value: string): void {
    if (!value) {
      this.host.reset();
    }
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onResolve($event: string): void {
    if (this.onChange) {
      this.onChange($event);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }

}

