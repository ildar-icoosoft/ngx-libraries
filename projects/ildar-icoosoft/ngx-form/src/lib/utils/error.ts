import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {FormError} from '../interfaces';

export const markAllFormControlsAsTouched = (formGroup: FormGroup): void => {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      markAllFormControlsAsTouched(control);
    }
  });
};

export const setFormErrors = (
  formGroup: FormGroup,
  formErrors: FormError[]
): void => {
  const formGroupErrors: string[] = [];
  const formControlErrors: Record<string, string[]> = {};

  formErrors.forEach(item => {
    const formControlName = item.formControlName;

    if (!formControlName) {
      formGroupErrors.push(item.message);
      return;
    }

    const formControl = formGroup.get(formControlName);

    if (formControl) {
      if (!formControlErrors[formControlName]) {
        formControlErrors[formControlName] = [];
      }
      formControlErrors[formControlName].push(item.message);
    } else {
      formGroupErrors.push(item.message);
    }
  });

  if (formGroupErrors.length) {
    formGroup.setErrors({
      customArr: formGroupErrors
    });
  }

  for (const formControlName in formControlErrors) {
    const formControl = formGroup.get(formControlName) as AbstractControl;

    formControl.setErrors({
      customArr: formControlErrors[formControlName]
    });
  }

  markAllFormControlsAsTouched(formGroup);
};

export const prepareValidationMessage = (value: string): string => {
  return value;
}



