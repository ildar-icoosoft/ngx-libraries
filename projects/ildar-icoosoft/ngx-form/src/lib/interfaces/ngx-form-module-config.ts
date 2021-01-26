import {DynamicField} from './dynamic-field';
import {ControlValueAccessor, ValidatorFn} from '@angular/forms';
import {Type} from '@angular/core';

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
  validators: {
    [key: string]: NgxFormValidatorConfig
  };
  errorMessages: {
    [key: string]: string
  };
}

export interface NgxFormValidatorConfig {
  isGroupValidator?: boolean;
  validator: (...args: any[]) => ValidatorFn
}
