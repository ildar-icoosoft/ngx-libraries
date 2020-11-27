import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  NgxFormModule,
} from '../projects/ildar-icoosoft/ngx-form/src/public-api';
import {Meta} from '@storybook/angular/types-6-0';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

const handleChange = (data: any) => {
  action('form-change');
};

export default {
  title: 'Example/Form validation',
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxFormModule.forRoot({
        }),
      ],
      schemas: [],
      declarations: [],
      providers: [],
    })
  ],
} as Meta;

export const html = () => ({
  template: `
  <form [formGroup]="group" novalidate>
    <input type="email" formControlName="email" placeholder="email">
    <input type="password" formControlName="password" placeholder="password">
    <button [disabled]="!group.valid">Submit</button>
</form>
`,
  props: {
    group: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  },
});
html.story = {
  name: `Simple form with validation messages`
};
