import {DynamicFieldData} from '../interfaces/dynamic-field-data';
import {NgxFormModuleConfig} from '../interfaces/ngx-form-module-config';
import {ValidatorFn} from '@angular/forms';
import {DynamicFieldDataOption} from '../interfaces/dynamic-field-data-option';

export const getFieldDataOptionValue = (options: DynamicFieldDataOption[], name: string, defaultValue: any = undefined) => {
  const option: DynamicFieldDataOption | undefined = options.find(item => item.name === name);
  if (option) {
    return option.value;
  }

  return defaultValue;
};

export const getValidators = (fieldData: DynamicFieldData, config: NgxFormModuleConfig): ValidatorFn[] => {
  const validators: ValidatorFn[] = [];
  fieldData.options.forEach(option => {
    if (option.name === 'validators') {
      const dynamicFormValidators: any[] = JSON.parse(option.value);

      dynamicFormValidators.forEach(dynamicFormValidator => {
        const validatorName = dynamicFormValidator.name;
        const validatorArgs = dynamicFormValidator.options;

        if (config.validators[validatorName] && !config.validators[validatorName].isGroupValidator) {
          validators.push(config.validators[validatorName].validator.call(null, fieldData, ...validatorArgs));
        }
      });
    }
  });
  return validators;
};

export const getGroupValidators = (fieldData: DynamicFieldData, config: NgxFormModuleConfig): ValidatorFn[] => {
  const validators: ValidatorFn[] = [];
  fieldData.options.forEach(option => {
    if (option.name === 'validators') {
      const dynamicFormValidators: any[] = JSON.parse(option.value);

      dynamicFormValidators.forEach(dynamicFormValidator => {
        const validatorName = dynamicFormValidator.name;
        const validatorArgs = dynamicFormValidator.options;

        if (config.validators[validatorName] && config.validators[validatorName].isGroupValidator) {
          validators.push(config.validators[validatorName].validator.call(null, fieldData, ...validatorArgs));
        }
      });
    }
  });
  return validators;
};

export const needToShowLabelOutside = (fieldData: DynamicFieldData, config: NgxFormModuleConfig): boolean => {
  const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

  let result = getFieldDataOptionValue(fieldDataOptions, 'needToShowLabelOutside');

  if (result !== undefined) {
    return result;
  }

  const itemConfig = config.fields[fieldData.type];
  if (!itemConfig) {
    const supportedTypes: string = Object.keys(config.fields).join(', ');
    throw Error(
      `Trying to use an unsupported type (${fieldData.type}).
        Supported types: ${supportedTypes}`
    );
  }

  result = itemConfig.needToShowLabelOutside || false;

  return result;
};

