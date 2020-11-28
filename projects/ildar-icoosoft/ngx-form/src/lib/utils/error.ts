import { FormControl, FormGroup } from '@angular/forms';
import {IFormError} from '../interfaces/form-error';

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
  formErrors: IFormError[]
): void => {
  const formGroupErrors: string[] = [];
  const formControlErrors: Record<string, string[]> = {};

  formErrors.forEach(item => {
    const formControlName = item.formControlName;

    if (!formControlName) {
      return formGroupErrors.push(item.message);
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
    const formControl = formGroup.get(formControlName);

    formControl.setErrors({
      customArr: formControlErrors[formControlName]
    });
  }

  markAllFormControlsAsTouched(formGroup);
};

export const prepareValidationMessage = (value: string): string => {
  return value;
}



