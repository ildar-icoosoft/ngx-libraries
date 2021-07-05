import { DynamicForm } from 'ii-ngx-form/src/lib/types';

export const dynamicFormDemoWithDependenciesAdvanced: DynamicForm = {
  validators: [],
  items: [
    {
      label: 'First name (наберите "some first name")',
      name: 'firstName',
      type: 'text',
      default: 'Chuck',
      validators: [],
      options: [],
      items: [],
    },
    {
      label: 'Дополнительные атрибуты',
      name: 'attrs',
      type: 'fieldset',
      validators: [],
      options: [],
      items: [
        {
          label: 'Заголовок атрибута (наберите "some title")',
          name: 'title',
          type: 'text',
          validators: [],
          options: [],
          items: [],
        },
      ],
      dependencies: {
        title: [
          {
            condition: {
              type: 'oneOf',
              value: ['some title'],
            },
            subschema: {
              items: [
                {
                  label: 'Описание атрибута',
                  name: 'desc',
                  type: 'text',
                  validators: [],
                  options: [],
                  items: [],
                },
              ],
            },
          },
        ],
      },
    },
  ],
  dependencies: {
    firstName: [
      {
        condition: {
          type: 'oneOf',
          value: ['some first name'],
        },
        subschema: {
          items: [
            {
              label: 'Last name',
              name: 'lastName',
              type: 'text',
              default: undefined,
              validators: [],
              options: [],
              items: [],
            },
          ],
        },
      },
    ],
  },
};

export const dynamicFormDemoWithDependenciesSimple: DynamicForm = {
  items: [
    {
      label: 'Text 1',
      name: 'text1',
      type: 'text',
      validators: [],
      options: [
        {
          name: 'placeholder',
          value: 'Text 1',
        },
      ],
      items: [],
    },
    {
      label: 'Show text 2',
      name: 'showText2',
      type: 'checkbox',
      validators: [],
      options: [],
      items: [],
    },
  ],
  dependencies: {
    showText2: [
      {
        condition: {
          type: 'oneOf',
          value: [true],
        },
        subschema: {
          items: [
            {
              label: 'Text 2',
              name: 'text2',
              type: 'text',
              validators: [],
              options: [
                {
                  name: 'placeholder',
                  value: 'Text 2',
                },
              ],
              items: [],
            },
          ],
        },
      },
    ],
  },
};

export const dynamicFormDataWithJsonSchemaValidator: DynamicForm = {
  validators: [
    {
      name: 'jsonSchema',
      options: [
        {
          type: 'object',
          properties: {
            fieldsetText1: { type: 'string' },
            fieldsetText2: { type: 'string' },
          },
          required: ['fieldsetText1'],
          additionalProperties: false,
        },
      ],
    },
  ],
  items: [
    {
      label: 'Text 1',
      name: 'fieldsetText1',
      type: 'text',
      validators: [],
      options: [
        {
          name: 'placeholder',
          value: 'Text 1',
        },
      ],
      items: [],
    },
    {
      label: 'Text 2',
      name: 'fieldsetText2',
      type: 'text',
      validators: [],
      options: [
        {
          name: 'placeholder',
          value: 'Text 2',
        },
      ],
      items: [],
    },
  ],
};

export const dynamicFormData: DynamicForm = {
  validators: [
    {
      name: 'passwordMatch',
      options: ['password', 'confirmPassword'],
    },
  ],
  items: [
    {
      label: 'Fieldset',
      name: 'fieldset',
      type: 'fieldset',
      validators: [],
      options: [
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-12"}]',
        },
        {
          name: 'formGroupCssClass',
          value: 'fieldset-wrapper',
        },
      ],
      items: [
        {
          label: 'Text 1',
          name: 'fieldsetText1',
          type: 'text',
          validators: [{ name: 'required', options: [] }],
          options: [
            {
              name: 'placeholder',
              value: 'Text 1',
            },
          ],
          items: [],
        },
        {
          label: 'Text 2',
          name: 'fieldsetText2',
          type: 'text',
          validators: [],
          options: [
            {
              name: 'placeholder',
              value: 'Text 2',
            },
          ],
          items: [],
        },
      ],
    },
    {
      label: 'Custom HTML',
      name: 'html',
      type: 'html',
      validators: [],
      options: [
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-12"}]',
        },
      ],
      items: [],
    },
    {
      label: 'Hidden Text <span class="required-sign">(*)</span>',
      name: 'hiddenText',
      type: 'text',
      validators: [{ name: 'required', options: [] }],
      hidden: true,
      options: [
        {
          name: 'placeholder',
          value: 'text placeholder',
        },
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'Textarea <span class="required-sign">(*)</span>',
      name: 'textarea',
      type: 'textarea',
      validators: [{ name: 'required', options: [] }],
      options: [
        {
          name: 'placeholder',
          value: 'text placeholder',
        },
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'Email <span class="required-sign">(*)</span>',
      name: 'email',
      type: 'email',
      validators: [
        { name: 'required', options: [] },
        { name: 'email', options: [] },
      ],
      options: [
        {
          name: 'placeholder',
          value: 'email placeholder',
        },
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'Password <span class="required-sign">(*)</span>',
      name: 'password',
      type: 'password',
      validators: [{ name: 'required', options: [] }],
      options: [
        {
          name: 'placeholder',
          value: 'password placeholder',
        },
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'Confirm Password <span class="required-sign">(*)</span>',
      name: 'confirmPassword',
      type: 'password',
      validators: [{ name: 'required', options: [] }],
      options: [
        {
          name: 'placeholder',
          value: 'confirm password placeholder',
        },
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'Select',
      name: 'select',
      type: 'select',
      validators: [],
      options: [
        {
          name: 'selectOptions',
          value: [
            { id: 'twitter-share-button', name: 'Share' },
            {
              id: 'twitter-follow-button',
              name: 'Follow',
            },
            {
              id: 'twitter-hashtag-button',
              name: 'Hashtag',
            },
            { id: 'twitter-mention-button', name: 'Mention' },
            {
              id: 'twitter-tweet',
              name: 'Tweet',
            },
            { id: 'twitter-tweet', name: 'Tweet' },
            {
              id: 'twitter-timeline',
              name: 'Timeline',
            },
          ],
        },
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'matSelect',
      name: 'matSelect',
      type: 'matSelect',
      validators: [],
      options: [
        {
          name: 'selectOptions',
          value: [
            { id: 'twitter-share-button', name: 'Share' },
            {
              id: 'twitter-follow-button',
              name: 'Follow',
            },
            {
              id: 'twitter-hashtag-button',
              name: 'Hashtag',
            },
            { id: 'twitter-mention-button', name: 'Mention' },
            {
              id: 'twitter-tweet',
              name: 'Tweet',
            },
            { id: 'twitter-tweet', name: 'Tweet' },
            {
              id: 'twitter-timeline',
              name: 'Timeline',
            },
          ],
        },
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'matChipList',
      name: 'matChipList',
      type: 'matChipList',
      validators: [],
      options: [
        {
          name: 'selectOptions',
          value: [
            { id: 'twitter-share-button', name: 'Share' },
            {
              id: 'twitter-follow-button',
              name: 'Follow',
            },
            {
              id: 'twitter-hashtag-button',
              name: 'Hashtag',
            },
            { id: 'twitter-mention-button', name: 'Mention' },
            {
              id: 'twitter-tweet',
              name: 'Tweet',
            },
            { id: 'twitter-tweet', name: 'Tweet' },
            {
              id: 'twitter-timeline',
              name: 'Timeline',
            },
          ],
        },
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
        {
          name: 'placeholder',
          value: 'add new social network...',
        },
      ],
      items: [],
    },
    {
      label: 'sortableMultiselect',
      name: 'sortableMultiselect',
      type: 'sortableMultiselect',
      validators: [],
      options: [
        {
          name: 'selectOptions',
          value: [
            { id: 'twitter-share-button', name: 'Share' },
            {
              id: 'twitter-follow-button',
              name: 'Follow',
            },
            {
              id: 'twitter-hashtag-button',
              name: 'Hashtag',
            },
            { id: 'twitter-mention-button', name: 'Mention' },
            {
              id: 'twitter-tweet',
              name: 'Tweet',
            },
            { id: 'twitter-tweet', name: 'Tweet' },
            {
              id: 'twitter-timeline',
              name: 'Timeline',
            },
          ],
        },
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'Text',
      name: 'text',
      type: 'text',
      validators: [],
      options: [
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'Number',
      name: 'number',
      type: 'number',
      validators: [],
      options: [
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'Checkbox',
      name: 'checkbox',
      type: 'checkbox',
      validators: [],
      options: [
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
      ],
      items: [],
    },
    {
      label: 'Multi Fieldset',
      name: 'multiFieldset',
      type: 'multiFieldset',
      validators: [],
      options: [
        {
          name: 'cssClass',
          value: 'col-lg-4 col-md-6 col-xs-12',
        },
        {
          name: 'formGroupCssClass',
          value: 'fieldset-wrapper',
        },
      ],
      items: [
        {
          label: 'Text',
          name: 'Text3',
          type: 'text',
          validators: [],
          options: [
            {
              name: 'placeholder',
              value: 'Text',
            },
          ],
          items: [],
        },
        {
          label: 'Checkbox',
          name: 'checkbox2',
          type: 'checkbox',
          validators: [],
          options: [],
          items: [],
        },
      ],
    },
    {
      label: 'Recaptcha',
      name: 'recaptcha',
      type: 'reCaptcha',
      validators: [{ name: 'required', options: [] }],
      options: [
        {
          name: 'doNotEncrypt',
          value: '1',
        },
        {
          name: 'doNotSave',
          value: '1',
        },
        {
          name: 'cssClass',
          value: 'col-lg-12',
        },
        {
          name: 'siteKey',
          value: '6LfKP_sZAAAAAAIsTU7sV8QofHdP_P_4gpqMf5g1',
        },
      ],
      items: [],
    },
  ],
};
