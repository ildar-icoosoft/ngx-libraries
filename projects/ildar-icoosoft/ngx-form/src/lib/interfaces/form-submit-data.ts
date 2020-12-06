import {FormError} from './form-error';

export interface FormSubmitData {
  values: Record<string, any>;
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (errors: FormError[]) => void;
}
