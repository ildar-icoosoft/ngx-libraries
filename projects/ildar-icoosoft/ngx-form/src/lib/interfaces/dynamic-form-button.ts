import {DynamicFormButtonClickEvent} from './dynamic-form-button-click-event';

export interface DynamicFormButton {
  cssClass?: string;
  cssContainerClass?: string;
  color?: string;
  label: string;
  onClick(event: DynamicFormButtonClickEvent): void;
}


