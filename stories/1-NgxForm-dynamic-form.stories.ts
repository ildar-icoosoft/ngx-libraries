import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { DynamicField, DynamicFieldOption, FormSubmitEvent } from 'ii-ngx-form/src/lib/types';
import { NgxFormModule } from 'ii-ngx-form/src/lib/ngx-form.module';
import {
  DynamicFormComponent,
  FieldsetComponent,
  InputComponent,
  MultiFieldsetComponent,
  ReCaptchaComponent,
  SelectComponent,
} from 'ii-ngx-form/src/lib/components';
import { getFieldDataOptionValue } from 'ii-ngx-form/src/lib/utils/dynamic-form';
import { CheckboxComponent } from 'ii-ngx-form/src/lib/components/checkbox/checkbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortableMultiselectComponent } from 'ii-ngx-form/src/lib/components/sortable-multiselect/sortable-multiselect.component';
import { dynamicFormData } from '../data-sample/dynamic-form';

const handleSubmit = (data: FormSubmitEvent) => {
  action('button-click');
  window.setTimeout(() => {
    data.setSubmitting(false);
  }, 3000);
};

const handleChange = () => {
  action('form-change');
};

export default {
  title: 'Example/Dynamic Form',
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        NgxFormModule.forRoot({
          fields: {
            password: {
              component: InputComponent,
              needToShowLabelOutside: true,
              props: {
                type: 'password',
              },
              mapConnectDataToProps: (fieldData: DynamicField) => {
                const fieldDataOptions: DynamicFieldOption[] = fieldData.options || [];

                const placeholder: string | undefined = getFieldDataOptionValue(
                  fieldDataOptions,
                  'placeholder',
                  '',
                );
                return {
                  placeholder,
                };
              },
            },
          },
        }),
      ],
      schemas: [],
      declarations: [],
      providers: [],
    }),
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
    groupChange: handleChange,
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

export const Checkbox = () => ({
  component: CheckboxComponent,
  props: {},
});
Checkbox.storyName = `<ii-checkbox>`;

export const Select = () => ({
  component: SelectComponent,
  props: {
    options: [
      {
        id: '1',
        name: 'Option 1',
      },
      {
        id: '2',
        name: 'Option 2',
      },
      {
        id: '3',
        name: 'Option 3',
      },
      {
        id: '4',
        name: 'Option 4',
      },
      {
        id: '5',
        name: 'Option 5',
      },
      {
        id: '6',
        name: 'Option 6',
      },
    ],
  },
});
Select.storyName = `<ii-select>`;

export const MatSelect = () => ({
  template: `
    <ii-mat-select [options]="options" [ngModel]="model" (ngModelChange)="onChange($event)" [multiple]="multiple"></ii-mat-select>
  `,
  props: {
    options: [
      {
        id: '1',
        name: 'Option 1',
      },
      {
        id: '2',
        name: 'Option 2',
      },
      {
        id: '3',
        name: 'Option 3',
      },
      {
        id: '4',
        name: 'Option 4',
      },
      {
        id: '5',
        name: 'Option 5',
      },
      {
        id: '6',
        name: 'Option 6',
      },
    ],
    model: ['3'],
    multiple: true,
    onChange: () => {},
  },
});
MatSelect.storyName = `<ii-mat-select>`;

export const MatChipList = () => ({
  template: `
    <ii-mat-chip-list
     [options]="options"
     [placeholder]="placeholder"
     [ngModel]="model"
     (ngModelChange)="onChange($event)"
    ></ii-mat-chip-list>
  `,
  props: {
    options: [
      {
        id: '1',
        name: 'Option 1',
      },
      {
        id: '2',
        name: 'Option 2',
      },
      {
        id: '3',
        name: 'Option 3',
      },
      {
        id: '4',
        name: 'Option 4',
      },
      {
        id: '5',
        name: 'Option 5',
      },
      {
        id: '6',
        name: 'Option 6',
      },
    ],
    placeholder: 'Add new item...',
    model: ['2', '4'],
    onChange: (data: any) => {
      console.log('onChange', data);
    },
  },
});
MatChipList.storyName = `<ii-mat-chip-list>`;

export const SortableMultiselect = (args: SortableMultiselectComponent) => ({
  component: SortableMultiselectComponent,
  props: args,
});

SortableMultiselect.storyName = `<ii-sortable-multiselect>`;
SortableMultiselect.args = {
  items: [
    { id: 'act1', name: 'act1' },
    { id: 'act2', name: 'act2' },
    { id: 'ai5b', name: 'ai5b' },
    { id: 'ai5d', name: 'ai5d' },
    { id: 'ai5d1', name: 'ai5d1' },
    { id: 'ai5i', name: 'ai5i' },
    { id: 'ai5k', name: 'ai5k' },
    { id: 'ai5l', name: 'ai5l' },
    { id: 'ai5n', name: 'ai5n' },
    { id: 'ai5o', name: 'ai5o' },
    { id: 'ai5o1', name: 'ai5o1' },
    { id: 'ai5s', name: 'ai5s' },
    { id: 'ai5u', name: 'ai5u' },
    { id: 'ai5v', name: 'ai5v' },
    { id: 'ai5w', name: 'ai5w' },
    { id: 'backtoreservecomponent59', name: 'backtoreservecomponent59' },
    { id: 'backtoreservecomponent72', name: 'backtoreservecomponent72' },
    { id: 'backtoreservecomponent76', name: 'backtoreservecomponent76' },
    { id: 'd1', name: 'd1' },
    { id: 'd2', name: 'd2' },
    { id: 'd3', name: 'd3' },
    { id: 'da', name: 'da' },
    { id: 'da4', name: 'da4' },
    { id: 'em10', name: 'em10' },
    { id: 'fai16', name: 'fai16' },
    { id: 'fai17', name: 'fai17' },
    { id: 'fai19', name: 'fai19' },
    { id: 'fai20', name: 'fai20' },
    { id: 'fai21', name: 'fai21' },
    { id: 'finalcomponent1', name: 'finalcomponent1' },
    { id: 'finalcomponent10', name: 'finalcomponent10' },
    { id: 'finalcomponent10FRUSMFOR', name: 'finalcomponent10FRUSMFOR' },
    { id: 'finalcomponent10MRUSFFOR', name: 'finalcomponent10MRUSFFOR' },
    { id: 'finalcomponent11FRUSMFOR', name: 'finalcomponent11FRUSMFOR' },
    { id: 'finalcomponent11MRUSFFOR', name: 'finalcomponent11MRUSFFOR' },
    { id: 'finalcomponent2', name: 'finalcomponent2' },
    { id: 'finalcomponent3FFOR', name: 'finalcomponent3FFOR' },
    { id: 'finalcomponent3FRUS', name: 'finalcomponent3FRUS' },
    { id: 'finalcomponent3MFOR', name: 'finalcomponent3MFOR' },
    { id: 'finalcomponent3MRUS', name: 'finalcomponent3MRUS' },
    { id: 'finalcomponent4FFOR', name: 'finalcomponent4FFOR' },
    { id: 'finalcomponent4FRUS', name: 'finalcomponent4FRUS' },
    { id: 'finalcomponent4MFOR', name: 'finalcomponent4MFOR' },
    { id: 'finalcomponent4MRUS', name: 'finalcomponent4MRUS' },
    { id: 'finalcomponent7', name: 'finalcomponent7' },
    { id: 'finalcomponent8', name: 'finalcomponent8' },
    { id: 'finalcomponent9', name: 'finalcomponent9' },
    { id: 'finishcomponent34', name: 'finishcomponent34' },
    { id: 'finishcomponent35', name: 'finishcomponent35' },
    { id: 'finishcomponent36', name: 'finishcomponent36' },
    { id: 'finishcomponent37', name: 'finishcomponent37' },
    { id: 'finishcomponent38', name: 'finishcomponent38' },
    { id: 'finishcomponent42', name: 'finishcomponent42' },
    { id: 'finishcomponent54', name: 'finishcomponent54' },
    { id: 'fl10', name: 'fl10' },
    { id: 'fl9', name: 'fl9' },
    { id: 'interimcomponent1', name: 'interimcomponent1' },
    { id: 'interimcomponent2', name: 'interimcomponent2' },
    { id: 'inviteDatacomponent61', name: 'inviteDatacomponent61' },
    { id: 'inviteDatacomponent62', name: 'inviteDatacomponent62' },
    { id: 'linkexpiredcomponent77', name: 'linkexpiredcomponent77' },
    { id: 'lockcomponent56', name: 'lockcomponent56' },
    { id: 'lockcomponent71', name: 'lockcomponent71' },
    { id: 'marriagedenycomponent60', name: 'marriagedenycomponent60' },
    { id: 'ms1', name: 'ms1' },
    { id: 'ms2', name: 'ms2' },
    { id: 'p2', name: 'p2' },
    { id: 'p3', name: 'p3' },
    { id: 'pd1', name: 'pd1' },
    { id: 'pd10', name: 'pd10' },
    { id: 'pd11', name: 'pd11' },
    { id: 'pd12', name: 'pd12' },
    { id: 'pd2', name: 'pd2' },
    { id: 'pd3', name: 'pd3' },
    { id: 'pd4', name: 'pd4' },
    { id: 'pd5', name: 'pd5' },
    { id: 'pd6', name: 'pd6' },
    { id: 'pd65', name: 'pd65' },
    { id: 'pd66', name: 'pd66' },
    { id: 'pd9', name: 'pd9' },
    { id: 'q1', name: 'q1' },
    { id: 'q2', name: 'q2' },
    { id: 'q3', name: 'q3' },
    { id: 'q4', name: 'q4' },
    { id: 'q5', name: 'q5' },
    { id: 'q6', name: 'q6' },
    { id: 'q7', name: 'q7' },
    { id: 'q8', name: 'q8' },
    { id: 'q9', name: 'q9' },
    { id: 'redirectcomponentpp', name: 'redirectcomponentpp' },
    { id: 'sn1a', name: 'sn1a' },
    { id: 'sn1aresend', name: 'sn1aresend' },
    { id: 'sn2a', name: 'sn2a' },
    { id: 'sn2aresend', name: 'sn2aresend' },
    { id: 'timecomponent61', name: 'timecomponent61' },
    { id: 'timecomponent62', name: 'timecomponent62' },
    { id: 'ts1', name: 'ts1' },
    { id: 'ts2', name: 'ts2' },
    { id: 'w1', name: 'w1' },
  ],
  placeholder: 'Select components',
};

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
    ],
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
    ],
  },
});
multiFieldset.storyName = `<ii-multi-fieldset>`;
