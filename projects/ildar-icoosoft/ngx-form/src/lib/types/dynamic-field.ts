import { DynamicFieldOption } from './dynamic-field-option';
import { DynamicFormValidator } from './dynamic-form-validator';

export interface DynamicField {
  label: string;
  name: string;
  type: string;
  default?: unknown;
  hidden?: boolean;
  validators?: DynamicFormValidator[];
  options?: DynamicFieldOption[];
  items?: DynamicField[];
}
