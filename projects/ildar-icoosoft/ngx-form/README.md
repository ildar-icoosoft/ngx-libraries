# NgxForm

Angular 2+ form components

## Installation

1. Use npm to install the package...

```terminal
$ npm install ii-ngx-form --save
```

2. You could either add into your module `imports` the `NgxFormModule` in order to add all of the components.

```typescript

import { NgxFormModule } from "ii-ngx-form";

@NgModule({
 // ...
 imports: [
   // ...
   NgxFormModule
 ]
})

```

## Dynamic Form component

Renders dynamic form............

### Usage

```typescript

// component ts

const formData: DynamicFormData = {
  items: [{
    label: 'Email',
    name: 'email',
    type: 'email',
    options: [{
      name: 'placeholder',
      value: 'enter your email'
    }],
    items: []
  }, {
    label: 'Password',
    name: 'password',
    type: 'password',
    options: [{
      name: 'placeholder',
      value: 'enter your password'
    }],
    items: []
  }]
};
```

```terminal
<ii-dynamic-form
   [formData]="formData" 
   [initialValues]="{email: '', password: '', someDate: '2019-12-30T13:50:00.061Z'}"
   (submit)="handleSubmit($event)"
/>
```

## Input component

Renders HTML `<input>` component

### Usage

```terminal
<ii-input [(ngModel)]="value" />
```

## How to add custom form controls

1. Create a component which implements [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor)
2. Add your component to NgxFormModule:

```typescript
import { NgxFormModule } from "ii-ngx-form";

@NgModule({
 // ...
 imports: [
  // ...
  NgxFormModule.forRoot({
   'fields': {
    'some-new-component': {
     component: SomeNewComponent
    }
   }  
  })
 ]
})
```

Then you can use this Connect form data with this type:

```typescript
const formData: DynamicFormData = {
  items: [{
    label: 'Label',
    name: 'name',
    type: 'some-new-component',
    options: [],
    items: []
  }]
};
```

@@ TO-DO List
- Set Recaptcha SiteKey via <ii-dynamic-form> props. At the current time we set <ii-dynamic-form> Recaptcha SiteKey in reCaptcha config in ngx-form.module file.  


