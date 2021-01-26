import {DynamicField} from '../interfaces/dynamic-field';
import {NgxFormModuleConfig} from '../interfaces/ngx-form-module-config';
import {ValidatorFn} from '@angular/forms';
import {DynamicFieldOption} from '../interfaces/dynamic-field-option';

export const getFieldDataOptionValue = (options: DynamicFieldOption[], name: string, defaultValue: any = undefined) => {
  const option: DynamicFieldOption | undefined = options.find(item => item.name === name);
  if (option) {
    return option.value;
  }

  return defaultValue;
};

export const getValidators = (fieldData: DynamicField, config: NgxFormModuleConfig): ValidatorFn[] => {
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

export const getGroupValidators = (fieldData: DynamicField, config: NgxFormModuleConfig): ValidatorFn[] => {
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

export const needToShowLabelOutside = (fieldData: DynamicField, config: NgxFormModuleConfig): boolean => {
  const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

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

