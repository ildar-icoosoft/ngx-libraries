import {DynamicField} from './dynamic-field';
import {DynamicFormValidator} from "./dynamic-form-validator";

export interface DynamicForm {
  validators: DynamicFormValidator[];
  items: DynamicField[];
}
