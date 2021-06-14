import {ControlValueAccessor, ValidatorFn} from '@angular/forms';
import {Type} from '@angular/core';
import {DynamicField} from './dynamic-field';

export interface NgxFormModuleConfig {
  fields: {
    [key: string]: {
      component: Type<ControlValueAccessor>;
      needToShowLabelOutside?: boolean;
      props?: {
        [key: string]: any;
      };
      mapConnectDataToProps?(connectData: DynamicField): {
        [key: string]: any;
      };
    };
  };
  validators: {
    [key: string]: NgxValidatorConfig;
  };
  errorMessages: {
    [key: string]: string;
  };
}

export interface NgxValidatorConfig {
  validator: (...args: any[]) => ValidatorFn;
}
