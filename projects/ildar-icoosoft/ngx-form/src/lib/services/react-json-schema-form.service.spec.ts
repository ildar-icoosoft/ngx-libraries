import { TestBed } from '@angular/core/testing';

import { ReactJsonSchemaFormService } from './react-json-schema-form.service';
import {DynamicForm, ReactJsonSchema} from "../types";

describe('ReactJsonSchemaFormService', () => {
  let service: ReactJsonSchemaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReactJsonSchemaFormService]
    });
    service = TestBed.inject(ReactJsonSchemaFormService);
  });

  it('should format', () => {
    expect(service).toBeTruthy();
  });

  describe('convertToDynamicForm() method', () => {
    it('simple form convert', () => {
      const jsonSchema: ReactJsonSchema = {
        "title": "A registration form",
        "description": "A simple form example.",
        "type": "object",
        "required": [
          "firstName",
          "lastName"
        ],
        "properties": {
          "firstName": {
            "type": "string",
            "title": "First name",
            "default": "Chuck"
          },
          "lastName": {
            "type": "string",
            "title": "Last name"
          },
          "telephone": {
            "type": "string",
            "title": "Telephone",
            "minLength": 10
          }
        }
      };

      const expected: DynamicForm = {
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

      expect(
        service.convertToDynamicForm(jsonSchema)
      ).toEqual(expected);
    });
  });
});


