import { DynamicFormComponentType } from './dynamic-form-component-type';

export interface DynamicFormButtonClickEvent {
  form: DynamicFormComponentType;
  nativeEvent: Event;
}
