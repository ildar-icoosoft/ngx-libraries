import { Injectable } from '@angular/core';
import {DynamicForm, ReactJsonSchema, ReactJsonUiSchema} from "../types";

@Injectable()
export class ReactJsonSchemaFormService {

  constructor() { }

  convertToDynamicForm(jsonSchema: ReactJsonSchema, jsonUiSchema?: ReactJsonUiSchema): DynamicForm {
    return {
      validators: [],
      items: [
        {
          label: 'First name',
          name: 'firstName',
          type: 'text',
          default: 'Chuck',
          validators: [
            {"name": "required", "options": []}
          ],
          options: [
          ],
          items: [],
        },
        {
          label: 'Last name',
          name: 'lastName',
          type: 'text',
          default: undefined,
          validators: [
            {"name": "required", "options": []}
          ],
          options: [
          ],
          items: [],
        },
        {
          label: 'Telephone',
          name: 'telephone',
          type: 'text',
          default: undefined,
          validators: [
            {
              "name": "minLength",
              "options": [10]
            }
          ],
          options: [
          ],
          items: [],
        },
      ]
    };
  }
}
