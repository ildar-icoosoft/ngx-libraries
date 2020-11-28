import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  NgxFormModule,
} from '../projects/ildar-icoosoft/ngx-form/src/public-api';
import {Meta} from '@storybook/angular/types-6-0';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {setFormErrors} from '../projects/ildar-icoosoft/ngx-form/src/lib/utils/error';

const handleSubmit = (group: FormGroup) => {
  action('submit-click');
  window.setTimeout(() => {
    setFormErrors(group, [{
      message: 'Some form error'
    }]);
  }, 3000);
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

export const formSample = () => ({
  template: `
  <form [formGroup]="group" novalidate (submit)="handleSubmit(group)">
    <ii-form-validation-errors group="group"></ii-form-validation-errors>
    <ii-validation-control [control]="group.controls.email">
      <input type="email" formControlName="email" placeholder="email">
    </ii-validation-control>
    <ii-validation-control [control]="group.controls.password">
        <input type="password" formControlName="password" placeholder="password">
    </ii-validation-control>
    <button [disabled]="!group.valid">Submit</button>
</form>
`,
  props: {
    group: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }),
    handleSubmit
  },
});
formSample.storyName = 'Form sample with validation-control and form validation message';
