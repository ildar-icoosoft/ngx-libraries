import {DynamicFieldDataOption} from './dynamic-field-data-option';

export interface DynamicFieldData {
  label: string;
  name: string;
  type: string;
  options: DynamicFieldDataOption[];
  items: DynamicFieldData[];
}
