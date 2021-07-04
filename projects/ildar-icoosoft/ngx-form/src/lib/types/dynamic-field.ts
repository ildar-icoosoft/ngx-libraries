import { DynamicFieldOption } from './dynamic-field-option';
import { DynamicFormValidator } from './dynamic-form-validator';
// eslint-disable-next-line import/no-cycle
import { DynamicFormDependency } from './dynamic-form-dependency';

export interface DynamicField {
  label: string;
  name: string;
  type: string;
  default?: unknown;
  hidden?: boolean;
  validators?: DynamicFormValidator[];
  options?: DynamicFieldOption[];
  items?: DynamicField[];
  dependencies?: Record<string, DynamicFormDependency>;
}
