import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import {FormSubmitData} from 'ii-ngx-form/src/lib/interfaces/form-submit-data';
import {NgxFormModule} from 'ii-ngx-form/src/lib/ngx-form.module';
import {InputComponent} from 'ii-ngx-form/src/lib/components/input/input.component';
import {DynamicFieldData} from 'ii-ngx-form/src/lib/interfaces/dynamic-field-data';
import {DynamicFieldDataOption} from 'ii-ngx-form/src/lib/interfaces/dynamic-field-data-option';
import {getFieldDataOptionValue} from 'ii-ngx-form/src/lib/utils/dynamic-form';
import {DynamicFormComponent} from 'ii-ngx-form/src/lib/components/dynamic-form/dynamic-form.component';
import {dynamicFormData} from '../data-sample/dynamic-form';
import {SelectComponent} from 'ii-ngx-form/src/lib/components/select/select.component';
import {FieldsetComponent} from 'ii-ngx-form/src/lib/components/fieldset/fieldset.component';
import {MultiFieldsetComponent} from 'ii-ngx-form/src/lib/components/multi-fieldset/multi-fieldset.component';
import {ReCaptchaComponent} from 'ii-ngx-form/src/lib/components/re-captcha/re-captcha.component';


const handleSubmit = (data: FormSubmitData) => {
  action('button-click');
  window.setTimeout(() => {
    data.setSubmitting(false);
  }, 3000);
};

const handleChange = (data: any) => {
  action('form-change');
};

export default {
  title: 'Example/Dynamic Form',
  decorators: [
    withKnobs,
    moduleMetadata({
      imports: [
        // IonicModule.forRoot(),
        NgxFormModule.forRoot({
          fields: {
            password: {
              component: InputComponent,
              needToShowLabelOutside: true,
              props: {
                type: 'password',
              },
              mapConnectDataToProps: (fieldData: DynamicFieldData) => {
                const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

                const placeholder: string | undefined = getFieldDataOptionValue(fieldDataOptions, 'placeholder', '');
                return {
                  placeholder
                };
              }
            },
          },
        }),
      ],
      schemas: [],
      declarations: [],
      providers: [],
    })
  ],
};


export const DynamicForm = () => ({
  component: DynamicFormComponent,
  props: {
    formData: dynamicFormData,
    initialValues: {
      html: text('html', 'some HTML text'),
      text: 'some text',
      select: 'twitter-follow-button'
    },
    submitForm: handleSubmit,
    groupChange: handleChange
  },
});
DynamicForm.storyName = '<ii-dynamic-form>';

export const InputText = () => ({
  component: InputComponent,
  props: {
    placeholder: text('placeholder', 'Enter Text'),
  },
});
InputText.storyName = `<ii-input>`;


export const InputEmail = () => ({
  component: InputComponent,
  props: {
    type: 'email',
    placeholder: text('placeholder', 'Enter Email'),
  },
});
InputEmail.storyName = `<ii-input type="email">`;


export const InputPassword = () => ({
  component: InputComponent,
  props: {
    type: 'password',
    placeholder: text('placeholder', 'Enter Password'),
  },
});
InputPassword.storyName = `<ii-input type="password">`;

export const Select = () => ({
  component: SelectComponent,
  props: {
    options: [{
      id: '1',
      value: 'Option 1'
    }, {
      id: '2',
      value: 'Option 2'
    }, {
      id: '3',
      value: 'Option 3'
    }, {
      id: '4',
      value: 'Option 4'
    }, {
      id: '5',
      value: 'Option 5'
    }, {
      id: '6',
      value: 'Option 6'
    }]
  },
});
Select.storyName = `<ii-select>`;

export const recaptcha = () => ({
  component: ReCaptchaComponent,
  props: {
    siteKey: '6LfKP_sZAAAAAAIsTU7sV8QofHdP_P_4gpqMf5g1',
  },
});
recaptcha.storyName = `<ii-re-captcha>`;

export const html = () => ({
  template: `<ii-html [(ngModel)]="model"></ii-html>`,
  props: {
    model: text('model',  '<span>Any custom HTML</span>'),
  },
});
html.storyName = `<ii-html>`;

export const fieldset = () => ({
  component: FieldsetComponent,
  props: {
    label: 'Fieldset',
    items: [
      {
        label: 'Text 1',
        name: 'text1',
        type: 'text',
        options: [],
        items: [],
      },
      {
        label: 'Text 2',
        name: 'text2',
        type: 'text',
        options: [],
        items: [],
      },
    ]
  },
});
fieldset.storyName = `<ii-fieldset>`;

export const multiFieldset = () => ({
  component: MultiFieldsetComponent,
  props: {
    label: 'Multi Fieldset',
    items: [
      {
        label: 'Text',
        name: 'text1',
        type: 'text',
        options: [],
        items: [],
      },
      {
        label: 'Text2',
        name: 'text2',
        type: 'text',
        options: [],
        items: [],
      },
    ]
  },
});
multiFieldset.storyName = `<ii-multi-fieldset>`;
