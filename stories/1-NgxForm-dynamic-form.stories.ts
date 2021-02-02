import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {dynamicFormData} from '../data-sample/dynamic-form';
import {DynamicField, DynamicFieldOption, FormSubmitEvent} from "ii-ngx-form/src/lib/interfaces";
import {NgxFormModule} from "ii-ngx-form/src/lib/ngx-form.module";
import {
  DynamicFormComponent, FieldsetComponent,
  InputComponent, MultiFieldsetComponent,
  ReCaptchaComponent,
  SelectComponent
} from "ii-ngx-form/src/lib/components";
import {getFieldDataOptionValue} from "ii-ngx-form/src/lib/utils/dynamic-form";
import {MatSelectComponent} from "ii-ngx-form/src/lib/components/mat-select/mat-select.component";


const handleSubmit = (data: FormSubmitEvent) => {
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
              mapConnectDataToProps: (fieldData: DynamicField) => {
                const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

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
      html: 'some HTML text',
      text: 'some text',
      select: 'twitter-follow-button',
    },
    submitForm: handleSubmit,
    groupChange: handleChange
  },
});
DynamicForm.storyName = '<ii-dynamic-form>';

export const InputText = () => ({
  component: InputComponent,
  props: {
    placeholder: 'Enter Text',
  },
});
InputText.storyName = `<ii-input>`;


export const InputEmail = () => ({
  component: InputComponent,
  props: {
    type: 'email',
    placeholder: 'Enter Email',
  },
});
InputEmail.storyName = `<ii-input type="email">`;


export const InputPassword = () => ({
  component: InputComponent,
  props: {
    type: 'password',
    placeholder: 'Enter Password',
  },
});
InputPassword.storyName = `<ii-input type="password">`;

export const Select = () => ({
  component: SelectComponent,
  props: {
    options: [{
      id: '1',
      name: 'Option 1'
    }, {
      id: '2',
      name: 'Option 2'
    }, {
      id: '3',
      name: 'Option 3'
    }, {
      id: '4',
      name: 'Option 4'
    }, {
      id: '5',
      name: 'Option 5'
    }, {
      id: '6',
      name: 'Option 6'
    }]
  },
});
Select.storyName = `<ii-select>`;

export const MatSelect = () => ({
  component: MatSelectComponent,
  props: {
    options: [{
      id: '1',
      name: 'Option 1'
    }, {
      id: '2',
      name: 'Option 2'
    }, {
      id: '3',
      name: 'Option 3'
    }, {
      id: '4',
      name: 'Option 4'
    }, {
      id: '5',
      name: 'Option 5'
    }, {
      id: '6',
      name: 'Option 6'
    }]
  },
});
MatSelect.storyName = `<ii-mat-select>`;

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
    model: '<span>Any custom HTML</span>',
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
