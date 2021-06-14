import { FormError } from './form-error';

export interface FormSubmitEvent<T = Record<string, any>> {
  values: T;
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (errors: FormError[]) => void;
}
