import {DynamicFieldOption} from './dynamic-field-option';

export interface DynamicField {
  label: string;
  name: string;
  type: string;
  options: DynamicFieldOption[];
  items: DynamicField[];
}
