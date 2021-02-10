import {ValidatorFn} from '@angular/forms';
import {DynamicField, DynamicFieldOption, DynamicForm, NgxFormModuleConfig} from "../interfaces";

export const getFieldDataOptionValue = <T = unknown>(options: DynamicFieldOption[], name: string, defaultValue: any = undefined): T => {
  const option: DynamicFieldOption | undefined = options.find(item => item.name === name);
  if (option) {
    return option.value;
  }

  return defaultValue;
};

export const getFieldValidators = (fieldData: DynamicField, config: NgxFormModuleConfig): ValidatorFn[] => {
  const validators: ValidatorFn[] = [];

  if (fieldData.validators) {
    fieldData.validators.forEach(dynamicFormValidator => {
      const validatorName = dynamicFormValidator.name;
      const validatorArgs = dynamicFormValidator.options;

      const validatorConfig = config.validators[validatorName];

      if (validatorConfig) {
        validators.push(validatorConfig.validator.apply(null, validatorArgs));
      }
    });
  }

  return validators;
};

export const getGroupValidators = (formData: DynamicForm, config: NgxFormModuleConfig): ValidatorFn[] => {
  const validators: ValidatorFn[] = [];

  if (formData.validators) {
    formData.validators.forEach(dynamicFormValidator => {
      const validatorName = dynamicFormValidator.name;
      const validatorArgs = dynamicFormValidator.options;

      const validatorConfig = config.validators[validatorName];

      if (validatorConfig) {
        validators.push(validatorConfig.validator.apply(null, validatorArgs));
      }
    });
  }

  return validators;
};

export const needToShowLabelOutside = (fieldData: DynamicField, config: NgxFormModuleConfig): boolean => {
  const fieldDataOptions: DynamicFieldOption[] = fieldData.options || [];

  let result = getFieldDataOptionValue<boolean | undefined>(fieldDataOptions, 'needToShowLabelOutside');

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

