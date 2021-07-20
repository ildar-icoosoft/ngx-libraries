import { SelectOption } from './select-option';

export interface ComponentWithDictionary {
  setOptions: (options: SelectOption[]) => void;
}
