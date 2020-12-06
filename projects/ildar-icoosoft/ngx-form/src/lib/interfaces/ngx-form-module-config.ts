import {DynamicFieldData} from './dynamic-field-data';
import {ControlValueAccessor, ValidatorFn} from '@angular/forms';

export interface NgxFormModuleConfig {
  fields?: {
    [key: string]: {
      component: ControlValueAccessor,
      needToShowLabelOutside?: boolean;
      props?: {
        [key: string]: any
      },
      mapConnectDataToProps?(connectData: DynamicFieldData): {
        [key: string]: any
      }
    }
  };
  validators?: {
    [key: string]: NgxFormValidatorConfig
  };
  errorMessages?: {
    [key: string]: string
  };
}

export interface NgxFormValidatorConfig {
  isGroupValidator?: boolean;
  validator: (...args: any[]) => ValidatorFn
}
