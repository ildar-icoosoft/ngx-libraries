import { SelectOption } from './select-option';

export interface LoadDictionaryEvent {
  name: string;
  filter: Record<string, unknown>;
  setOptions: (options: SelectOption[]) => void;
  setError: (error: string) => void;
}
