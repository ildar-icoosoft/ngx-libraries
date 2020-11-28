import { moduleMetadata } from '@storybook/angular';
import {Meta} from '@storybook/angular/types-6-0';
import {SafePipe} from '../projects/ildar-icoosoft/ngx-common/src/lib/pipes/safe.pipe';

export default {
  title: 'Example/NgxCommon',
  decorators: [
    moduleMetadata({
      imports: [
      ],
      schemas: [],
      declarations: [
        SafePipe
      ],
      providers: [],
    })
  ],
} as Meta;

export const safePipe = () => ({
  template: `
  <h4>An untrusted URL:</h4>
<p><a class="e2e-dangerous-url" [href]="dangerousUrl">Click me</a></p>
<h4>A trusted URL:</h4>
<p><a class="e2e-trusted-url" [href]="dangerousUrl | safe:'url'">Click me</a></p>
`,
  props: {
    dangerousUrl: 'javascript:alert("Hi there")'
  },
});
safePipe.storyName = 'Safe pipe';
