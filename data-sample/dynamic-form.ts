import {DynamicForm} from 'ii-ngx-form/src/lib/interfaces/dynamic-form';


export const dynamicFormData: DynamicForm = {
  validators: [],
  items: [
    {
      label: 'Правила',
      name: 'rules',
      type: 'multiFieldset',
      validators: [],
      options: [
      ],
      items: [
        {
          label: 'conditions',
          name: 'conditions',
          type: 'multiFieldset',
          validators: [],
          options: [],
          items: [
            {
              label: 'field',
              name: 'field',
              type: 'text',
              validators: [],
              options: [],
              items: []
            },
            {
              label: 'visited',
              name: 'visited',
              type: 'checkbox',
              validators: [],
              options: [],
              items: []
            },
            {
              label: 'value',
              name: 'value',
              type: 'text',
              validators: [],
              options: [],
              items: []
            },
          ]
        },
        {
          label: 'nextDisplay',
          name: 'nextDisplay',
          type: 'text',
          validators: [],
          options: [],
          items: []
        }
      ]
    }
  ]
};
