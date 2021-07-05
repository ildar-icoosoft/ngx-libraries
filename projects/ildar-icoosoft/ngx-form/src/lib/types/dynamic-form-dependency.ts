import { DynamicFormDependencyCondition } from './dynamic-form-dependency-condition';
// eslint-disable-next-line import/no-cycle
import { DynamicField } from './dynamic-field';

export interface DynamicFormDependency {
  condition: DynamicFormDependencyCondition;
  subschema: {
    items: DynamicField[];
  };
}
