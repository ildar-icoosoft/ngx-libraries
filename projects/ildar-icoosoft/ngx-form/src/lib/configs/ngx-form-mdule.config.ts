import {getFieldDataOptionValue} from '../utils/dynamic-form';
import {ValidatorFn, Validators} from '@angular/forms';
import {validateEqual} from '../validators';
import {DynamicField, DynamicFieldOption, DynamicForm, NgxFormModuleConfig} from "../interfaces";
import {
  FieldsetComponent, HtmlComponent,
  InputComponent,
  MultiFieldsetComponent,
  ReCaptchaComponent,
  SelectComponent,
  TextareaComponent
} from "../components";
import {CheckboxComponent} from "../components/checkbox/checkbox.component";
import {MatSelectComponent} from "../components/mat-select/mat-select.component";


export const defaultNgxFormModuleConfig: NgxFormModuleConfig = {
  fields: {
    text: {
      component: InputComponent,
      needToShowLabelOutside: true,
      props: {
        type: 'text'
      },
      mapConnectDataToProps: (fieldData: DynamicField) => {
        const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

        const readonly: boolean = getFieldDataOptionValue(fieldDataOptions, 'readonly', false);

        const placeholder: string | undefined = getFieldDataOptionValue(fieldDataOptions, 'placeholder', '');
        return {
          placeholder,
          readonly
        };
      }
    },
    checkbox: {
      component: CheckboxComponent,
      needToShowLabelOutside: true,
      props: {
      },
      mapConnectDataToProps: (fieldData: DynamicField) => {
        const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

        return {
          readonly: getFieldDataOptionValue<boolean>(fieldDataOptions, 'readonly', false),
          value: getFieldDataOptionValue<boolean>(fieldDataOptions, 'value', true),
        };
      }
    },
    number: {
      component: InputComponent,
      needToShowLabelOutside: true,
      props: {
        type: 'number'
      },
      mapConnectDataToProps: (fieldData: DynamicField) => {
        const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

        const readonly: boolean = getFieldDataOptionValue(fieldDataOptions, 'readonly', false);

        const placeholder: string | undefined = getFieldDataOptionValue(fieldDataOptions, 'placeholder', '');
        return {
          placeholder,
          readonly
        };
      }
    },
    textarea: {
      component: TextareaComponent,
      needToShowLabelOutside: true,
      props: {},
      mapConnectDataToProps: (fieldData: DynamicField) => {
        const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

        const readonly: boolean = getFieldDataOptionValue(fieldDataOptions, 'readonly', false);

        const placeholder: string | undefined = getFieldDataOptionValue(fieldDataOptions, 'placeholder', '');
        return {
          placeholder,
          readonly
        };
      }
    },
    reCaptcha: {
      component: ReCaptchaComponent,
      needToShowLabelOutside: true,
      props: {},
      mapConnectDataToProps: (connectData: DynamicField) => {
        const fieldDataOptions: DynamicFieldOption[] = connectData.options;

        return {
          theme: getFieldDataOptionValue(fieldDataOptions, 'theme'),
          type: getFieldDataOptionValue(fieldDataOptions, 'type'),
          size: getFieldDataOptionValue(fieldDataOptions, 'size'),
          tabIndex: getFieldDataOptionValue(fieldDataOptions, 'tabIndex'),
          badge: getFieldDataOptionValue(fieldDataOptions, 'badge'),
          siteKey: getFieldDataOptionValue(fieldDataOptions, 'siteKey'),
        };
      }
    },
    select: {
      component: SelectComponent,
      needToShowLabelOutside: true,
      mapConnectDataToProps: (fieldData: DynamicField) => {
        const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

        return {
          options: getFieldDataOptionValue(fieldDataOptions, 'selectOptions')
        };
      }
    },
    matSelect: {
      component: MatSelectComponent,
      needToShowLabelOutside: true,
      mapConnectDataToProps: (fieldData: DynamicField) => {
        const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

        return {
          options: getFieldDataOptionValue(fieldDataOptions, 'selectOptions'),
          placeholder: getFieldDataOptionValue(fieldDataOptions, 'placeholder', ''),
          multiple: getFieldDataOptionValue(fieldDataOptions, 'multiple', false),
        };
      }
    },
    email: {
      component: InputComponent,
      needToShowLabelOutside: true,
      props: {
        type: 'email'
      },
      mapConnectDataToProps: (fieldData: DynamicField) => {
        const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

        const placeholder: string | undefined = getFieldDataOptionValue(fieldDataOptions, 'placeholder', '');
        return {
          placeholder
        };
      }
    },
    fieldset: {
      component: FieldsetComponent,
      needToShowLabelOutside: true,
      mapConnectDataToProps: (fieldData: DynamicField) => {
        return {
          items: fieldData.items
        };
      }
    },
    multiFieldset: {
      component: MultiFieldsetComponent,
      needToShowLabelOutside: true,
      mapConnectDataToProps: (fieldData: DynamicField) => {
        const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

        return {
          defaultValues: getFieldDataOptionValue(fieldDataOptions, 'defaultValues', {}),
          removeButtonText: getFieldDataOptionValue(fieldDataOptions, 'removeButtonText', 'Remove'),
          removeButtonCssClass: getFieldDataOptionValue(fieldDataOptions, 'removeButtonCssClass', 'btn btn-warning mt-2'),
          addButtonText: getFieldDataOptionValue(fieldDataOptions, 'addButtonText', 'Add'),
          addButtonCssClass: getFieldDataOptionValue(fieldDataOptions, 'addButtonCssClass', 'btn btn-success mt-3'),
          items: fieldData.items
        };
      }
    },
    html: {
      component: HtmlComponent,
      needToShowLabelOutside: true,
      mapConnectDataToProps: (fieldData: DynamicField) => {
        const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

        return {
          // label: connectData.label,
          cssClass: getFieldDataOptionValue(fieldDataOptions, 'inputCssClass', '')
        };
      }
    },
  },
  validators: {
    required: {
      validator: () => {
        return Validators.required;
      }
    },
    requiredTrue: {
      validator: () => {
        return Validators.requiredTrue;
      }
    },
    email: {
      validator: () => {
        return Validators.email;
      }
    },
    passwordMatch: {
      validator: (field1Name, field2name) => {
        return validateEqual(field1Name, field2name) as ValidatorFn;
      }
    }
  },
  errorMessages: {
    required: 'This field is required',
    email: 'Wrong email format',
    mismatch: 'Field values mismatch',
    minlength: 'Field length is too short must be {requiredLength}, actual is {actualLength}',
    maxlength: 'Field length is too long must be {requiredLength}, actual is {actualLength}',
    age: 'The age under {requiredAge} is not accepted',
    min: 'The minimum value for an input field is {min}',
    max: 'The maximum value for an input field is {max}',
  }
};
