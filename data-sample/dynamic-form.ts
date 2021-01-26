import {DynamicForm} from 'ii-ngx-form/src/lib/interfaces/dynamic-form';


export const dynamicFormData: DynamicForm = {
  items: [
    {
      label: 'Custom HTML',
      name: 'html',
      type: 'html',
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
      options: [
        {
          name: 'placeholder',
          value: 'text placeholder',
        },
        {
          name: 'validators',
          value: '[{"name":"required","options":[]}]',
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
      options: [
        {
          name: 'placeholder',
          value: 'text plaeeholder',
        },
        {
          name: 'validators',
          value: '[{"name":"required","options":[]}]',
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
      options: [
        {
          name: 'placeholder',
          value: 'email placeholder',
        },
        {
          name: 'validators',
          value: '[{"name":"required","options":[]}, {"name":"email","options":[]}]',
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
      options: [
        {
          name: 'placeholder',
          value: 'password placeholder',
        },
        {
          name: 'validators',
          value: '[{"name":"required","options":[]}]',
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
      options: [
        {
          name: 'placeholder',
          value: 'confirm password placeholder',
        },
        {
          name: 'validators',
          value: '[{"name":"required","options":[]}, {"name": "passwordMatch", "options": []}]',
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
      options: [
        {
          name: 'default',
          value: 'twitter-share-button',
        },
        {
          name: 'options',
          value:
            '[{"name":"twitter-share-button","label":"Share","position":"0"},{"name":"twitter-follow-button","label":"Follow","position":"1"},{"name":"twitter-hashtag-button","label":"Hashtag","position":"2"},{"name":"twitter-mention-button","label":"Mention","position":"3"},{"name":"twitter-tweet","label":"Tweet","position":"4"},{"name":"twitter-tweet","label":"Tweet","position":"4"},{"name":"twitter-timeline","label":"Timeline","position":"5"}]',
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
          options: [],
          items: [],
        },
      ],
    },
    {
      label: 'Recaptcha',
      name: 'recaptcha',
      type: 'reCaptcha',
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
          name: 'validators',
          value: '[{"name":"required","options":[]}]',
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
