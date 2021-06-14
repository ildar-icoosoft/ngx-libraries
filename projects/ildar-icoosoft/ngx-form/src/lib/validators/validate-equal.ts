import { FormControl, FormGroup } from '@angular/forms';
import { omit as _omit, isEmpty as _isEmpty } from 'lodash';

export const validateEqual = (a: FormControl | string, b: FormControl | string) => (
  group: FormGroup,
): { [s: string]: boolean } | null => {
  const controlA = a instanceof FormControl ? a : group.root.get(a);
  const controlB = b instanceof FormControl ? b : group.root.get(b);

  if (!controlA || !controlB) {
    return null;
  }

  const controlBErrors = controlB.errors;

  if (controlA.value !== controlB.value) {
    controlB.setErrors({ ...controlBErrors, mismatch: true });
  } else if (controlB.hasError('mismatch')) {
    const newErrors = _omit(controlBErrors, 'mismatch');
    controlB.setErrors(_isEmpty(newErrors) ? null : newErrors);
  }
  return null;
};
