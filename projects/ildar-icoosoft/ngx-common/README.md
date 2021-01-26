# NgxCommon

Angular 2+ common components, pipes, services, directives.

## Installation

1. Use npm to install the package

```terminal
$ npm install ii-ngx-common --save
```

2. You could either add into your module `imports` the `NgxCommonModule` in order to add all of the pipes.

```typescript
import { NgxCommonModule } from "ii-ngx-common";

@NgModule({
 // ...
 imports: [
   // ...
   NgxCommonModule
 ]
})
```

## Safe pipe

Marks value that's safe to use as HTML, CSS, Script, etc.

### Usage

```terminal

<div [innerHTML]="data | safe:'html'">Safe html</div>
<div [innerHTML]="data | safe:'style'">Safe css</div>
<div [innerHTML]="data | safe:'script'">Safe css</div>
<div [innerHTML]="data | safe:'url'">Safe css</div>
<div [innerHTML]="data | safe:'resourceUrl'">Safe css</div>

```

## Unsubscribe service

Observable service which is unsubscribed after service is destroyed.

### Usage

```terminal

import {UnsubscribeService} from "ii-ngx-common";

@Component({
  ...
  providers: [UnsubscribeService]
})
export class MyComponent {
  constructor(unsubscribeService$: UnsubscribeService) {
    someObservable.pipe(
	  takeUntil(unsubscribeService$)
	).subscribe(() => {
	  ...
	});
  }
}

```
