import {ValidatorFn} from '@angular/forms';

export interface INgxFormModuleConfig {
  validators?: {
    [key: string]: INgxFormValidatorConfig
  };
  errorMessages?: {
    [key: string]: string
  };
}

export interface INgxFormValidatorConfig {
  isGroupValidator?: boolean;
  validator: (...args: any[]) => ValidatorFn;
}
