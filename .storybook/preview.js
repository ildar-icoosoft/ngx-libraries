import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

/* Importing angular-material theme. */
import '!style-loader!css-loader!@angular/material/prebuilt-themes/deeppurple-amber.css';

/* Importing ng-select theme. */
import "!style-loader!css-loader!@ng-select/ng-select/themes/default.theme.css";

setCompodocJson(docJson);


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
