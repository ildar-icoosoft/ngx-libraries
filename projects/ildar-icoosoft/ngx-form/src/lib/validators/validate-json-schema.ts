import Ajv, { Schema, JSONSchemaType, ErrorObject } from 'ajv';
import { FormGroup } from '@angular/forms';

export const validateJsonSchema = (jsonSchema: Schema | JSONSchemaType<unknown>) => (
  group: FormGroup,
): { [s: string]: boolean } | null => {
  const ajv = new Ajv({
    allErrors: true,
  });
  const validate = ajv.compile(jsonSchema);

  const valid = validate(group.getRawValue());

  if (!valid) {
    const errors = validate.errors as ErrorObject[];

    errors.forEach((error) => {
      const parts: string[] = error.dataPath.split('/');
      parts.shift();

      const control = group.get(parts);
      if (!control) {
        throw Error(`Control ${parts.join('.')} not found`);
      }

      control.setErrors({
        ...control.errors,
        jsonSchema: error,
      });
    });
  }
  return null;
};
