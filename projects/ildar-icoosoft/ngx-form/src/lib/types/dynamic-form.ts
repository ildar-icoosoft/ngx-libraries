import { DynamicField } from './dynamic-field';
import { DynamicFormValidator } from './dynamic-form-validator';
import { DynamicFormDependency } from './dynamic-form-dependency';

export interface DynamicForm {
  validators?: DynamicFormValidator[];
  items: DynamicField[];
  dependencies?: Record<string, DynamicFormDependency>;
}
