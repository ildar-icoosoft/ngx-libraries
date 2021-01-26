import {DynamicField} from './dynamic-field';
import {ControlValueAccessor, ValidatorFn} from '@angular/forms';
import {Type} from '@angular/core';
import {DynamicForm} from "./dynamic-form";

export interface NgxFormModuleConfig {
  fields: {
    [key: string]: {
      component: Type<ControlValueAccessor>,
      needToShowLabelOutside?: boolean;
      props?: {
        [key: string]: any
      },
      mapConnectDataToProps?(connectData: DynamicField): {
        [key: string]: any
      }
    }
  };
  groupValidators: {
    [key: string]: NgxGroupValidatorConfig
  };
  fieldValidators: {
    [key: string]: NgxFieldValidatorConfig
  };
  errorMessages: {
    [key: string]: string
  };
}

export interface NgxGroupValidatorConfig {
  validator: (form: DynamicForm, ...args: any[]) => ValidatorFn
}

export interface NgxFieldValidatorConfig {
  validator: (field: DynamicField, ...args: any[]) => ValidatorFn
}
