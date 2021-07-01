import {
  Component,
  forwardRef,
  Inject,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
} from '@angular/forms';
import { DynamicField, NgxFormModuleConfig } from '../../types';
import { NGX_FORM_MODULE_CONFIG } from '../../constants/ngx-form-module-config';
import { getFieldValidators } from '../../utils/dynamic-form';
import { FieldsetComponentType } from '../../types/fieldset-component-type';
import { FieldComponentType } from '../../types/field-component-type';
// eslint-disable-next-line import/no-cycle
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'ii-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => FieldsetComponent),
      multi: true,
    },
  ],
})
export class FieldsetComponent implements FieldsetComponentType, OnInit, ControlValueAccessor {
  @Input() items: DynamicField[] = [];

  @ViewChildren(FieldComponent) fieldComponents!: QueryList<FieldComponent>;

  group!: FormGroup;

  constructor(@Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig) {}

  ngOnInit(): void {
    this.group = new FormGroup({});

    this.items.forEach((item: DynamicField) => {
      const validators: ValidatorFn[] = getFieldValidators(item, this.config);

      this.group.addControl(item.name, new FormControl(null, validators));
    });

    this.group.valueChanges.subscribe((val) => {
      this.propagateChange(val);
    });
  }

  getFieldsetItem(name: string): FieldComponentType {
    const arr = this.fieldComponents.toArray();

    const fieldComponent = arr.find((item) => item.fieldData.name === name);
    if (!fieldComponent) {
      throw Error(`field ${name} not found`);
    }

    return fieldComponent;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  propagateChange = (_: any) => {};

  propagateTouch = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.group.setValue(value, {
        emitEvent: false,
      });
    }
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.group.disable();
    } else {
      this.group.enable();
    }
  }
}
