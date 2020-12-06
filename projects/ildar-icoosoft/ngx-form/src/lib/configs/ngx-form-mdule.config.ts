import {NgxFormModuleConfig} from '../interfaces/ngx-form-module-config';
import {getFieldDataOptionValue} from '../utils/dynamic-form';
import {DynamicFieldData} from '../interfaces/dynamic-field-data';
import {DynamicFieldDataOption} from '../interfaces/dynamic-field-data-option';
import {Validators} from '@angular/forms';
import {validateEqual} from '../validators';
import {InputComponent} from '../components/input/input.component';
import {SelectComponent} from '../components/select/select.component';
import {TextareaComponent} from '../components/textarea/textarea.component';
import {HtmlComponent} from '../components/html/html.component';
import {MultiFieldsetComponent} from '../components/multi-fieldset/multi-fieldset.component';
import {FieldsetComponent} from '../components/fieldset/fieldset.component';
import {ReCaptchaComponent} from '../components/re-captcha/re-captcha.component';

export const defaultNgxFormModuleConfig: NgxFormModuleConfig = {
  fields: {
    text: {
      component: InputComponent,
      needToShowLabelOutside: true,
      props: {
        type: 'text'
      },
      mapConnectDataToProps: (fieldData: DynamicFieldData) => {
        const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

        const readonly: boolean = getFieldDataOptionValue(fieldDataOptions, 'readonly', false);

        const placeholder: string | undefined = getFieldDataOptionValue(fieldDataOptions, 'placeholder', '');
        return {
          placeholder,
          readonly
        };
      }
    },
    number: {
      component: InputComponent,
      needToShowLabelOutside: true,
      props: {
        type: 'number'
      },
      mapConnectDataToProps: (fieldData: DynamicFieldData) => {
        const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

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
      mapConnectDataToProps: (fieldData: DynamicFieldData) => {
        const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

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
      mapConnectDataToProps: (connectData: DynamicFieldData) => {
        const fieldDataOptions: DynamicFieldDataOption[] = connectData.options;

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
      mapConnectDataToProps: (fieldData: DynamicFieldData) => {
        const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

        let selectOptions = [];

        const selectOptionsStr: string = getFieldDataOptionValue(fieldDataOptions, 'options');
        if (selectOptionsStr) {
          selectOptions = JSON.parse(selectOptionsStr).map(item => ({
            id: item.name,
            value: item.label
          }));
        }

        return {
          options: selectOptions
        };
      }
    },
    email: {
      component: InputComponent,
      needToShowLabelOutside: true,
      props: {
        type: 'email'
      },
      mapConnectDataToProps: (fieldData: DynamicFieldData) => {
        const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

        const placeholder: string | undefined = getFieldDataOptionValue(fieldDataOptions, 'placeholder', '');
        return {
          placeholder
        };
      }
    },
    fieldset: {
      component: FieldsetComponent,
      needToShowLabelOutside: true,
      mapConnectDataToProps: (fieldData: DynamicFieldData) => {
        return {
          items: fieldData.items
        };
      }
    },
    multiFieldset: {
      component: MultiFieldsetComponent,
      needToShowLabelOutside: true,
      mapConnectDataToProps: (fieldData: DynamicFieldData) => {
        return {
          items: fieldData.items
        };
      }
    },
    html: {
      component: HtmlComponent,
      needToShowLabelOutside: true,
      mapConnectDataToProps: (fieldData: DynamicFieldData) => {
        const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

        return {
          // label: connectData.label,
          cssClass: getFieldDataOptionValue(fieldDataOptions, 'inputCssClass', '')
        };
      }
    },
  },
  validators: {
    required: {
      isGroupValidator: false,
      validator: () => {
        return Validators.required;
      }
    },
    email: {
      isGroupValidator: false,
      validator: () => {
        return Validators.email;
      }
    },
    passwordMatch: {
      isGroupValidator: true,
      validator: (fieldData: DynamicFieldData) => {
        const a = 'password';
        const b = fieldData.name;

        return validateEqual(a, b);
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
