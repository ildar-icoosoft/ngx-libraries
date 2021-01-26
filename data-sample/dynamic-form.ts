import {DynamicForm} from 'ii-ngx-form/src/lib/interfaces/dynamic-form';


export const dynamicFormData: DynamicForm = {
  validators: [
    {
      name: "passwordMatch",
      options: ['password', 'confirmPassword']
    }
  ],
  items: [
    {
      label: 'Custom HTML',
      name: 'html',
      type: 'html',
      validators: [],
      options: [
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-12"}]'
        }
      ],
      items: [],
    },
    {
      label: 'Text <span class="required-sign">(*)</span>',
      name: 'text',
      type: 'text',
      validators: [{"name": "required", "options": []}],
      options: [
        {
          name: 'placeholder',
          value: 'text placeholder',
        },
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-4 col-md-6 col-xs-12"}]'
        }
      ],
      items: [],
    },
    {
      label: 'Textarea <span class="required-sign">(*)</span>',
      name: 'textarea',
      type: 'textarea',
      validators: [{"name": "required", "options": []}],
      options: [
        {
          name: 'placeholder',
          value: 'text plaeeholder',
        },
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-4 col-md-6 col-xs-12"}]'
        }
      ],
      items: [],
    },
    {
      label: 'Email <span class="required-sign">(*)</span>',
      name: 'email',
      type: 'email',
      validators: [{"name": "required", "options": []}, {"name": "email", "options": []}],
      options: [
        {
          name: 'placeholder',
          value: 'email placeholder',
        },
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-4 col-md-6 col-xs-12"}]'
        }
      ],
      items: [],
    },
    {
      label: 'Password <span class="required-sign">(*)</span>',
      name: 'password',
      type: 'password',
      validators: [{"name": "required", "options": []}],
      options: [
        {
          name: 'placeholder',
          value: 'password placeholder',
        },
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-4 col-md-6 col-xs-12"}]'
        }
      ],
      items: [],
    },
    {
      label: 'Confirm Password <span class="required-sign">(*)</span>',
      name: 'confirmPassword',
      type: 'password',
      validators: [{"name": "required", "options": []}],
      options: [
        {
          name: 'placeholder',
          value: 'confirm password placeholder',
        },
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-4 col-md-6 col-xs-12"}]'
        }
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
          name: 'default',
          value: 'twitter-share-button',
        },
        {
          name: 'selectOptions',
          value:
            [
              {"name": "twitter-share-button", "label": "Share"},
              {
                "name": "twitter-follow-button",
                "label": "Follow"
              },
              {
                "name": "twitter-hashtag-button",
                "label": "Hashtag"
              },
              {"name": "twitter-mention-button", "label": "Mention"},
              {
                "name": "twitter-tweet",
                "label": "Tweet"
              },
              {"name": "twitter-tweet", "label": "Tweet"},
              {
                "name": "twitter-timeline",
                "label": "Timeline",
              }
            ],
        },
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-4 col-md-6 col-xs-12"}]'
        }
      ],
      items: [],
    },
    {
      label: 'text',
      name: 'Text',
      type: 'text',
      validators: [],
      options: [
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-4 col-md-6 col-xs-12"}]'
        }
      ],
      items: [],
    },
    {
      label: 'Fieldset',
      name: 'fieldset',
      type: 'fieldset',
      validators: [],
      options: [
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-12"}]'
        },
        {
          name: 'formGroupCssClass',
          value: 'fieldset-wrapper'
        }
      ],
      items: [
        {
          label: 'Text',
          name: 'Text2',
          type: 'text',
          validators: [],
          options: [
            {
              name: 'placeholder',
              value: 'Text',
            }
          ],
          items: [],
        },
        {
          label: 'Text',
          name: 'text3',
          type: 'text',
          validators: [],
          options: [
            {
              name: 'placeholder',
              value: 'Text 2',
            }
          ],
          items: [],
        },
      ],
    },
    {
      label: 'Multi Fieldset',
      name: 'multiFieldset',
      type: 'multiFieldset',
      validators: [],
      options: [
        {
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-12"}]'
        },
        {
          name: 'formGroupCssClass',
          value: 'fieldset-wrapper'
        }
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
            }
          ],
          items: [],
        },
        {
          label: 'Checkbox',
          name: 'text2',
          type: 'text',
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
      validators: [{"name": "required", "options": []}],
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
          name: 'htmlOptions',
          value: '[{"name":"cssClass","value":"col-lg-12"}]'
        },
        {
          name: 'siteKey',
          value: '6LfKP_sZAAAAAAIsTU7sV8QofHdP_P_4gpqMf5g1',
        }
      ],
      items: [],
    },
  ]

};
