import { Component, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicField, DynamicFieldOption, NgxFormModuleConfig } from '../../types';
import { getFieldDataOptionValue, needToShowLabelOutside } from '../../utils/dynamic-form';
import { NGX_FORM_MODULE_CONFIG } from '../../constants/ngx-form-module-config';

@Component({
  selector: 'ii-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent {
  @Input() fieldData?: DynamicField;

  @Input() control?: AbstractControl;

  @Input() index = 0;

  constructor(@Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig) {}

  getCssClass(fieldData: DynamicField): string {
    const fieldDataOptions: DynamicFieldOption[] = fieldData.options || [];

    return getFieldDataOptionValue(fieldDataOptions, 'cssClass', '');
  }

  isHidden(fieldData: DynamicField): boolean {
    return fieldData.hidden || false;
  }

  getFormGroupCssClass(fieldData: DynamicField): string {
    const fieldDataOptions: DynamicFieldOption[] = fieldData.options || [];

    return getFieldDataOptionValue(fieldDataOptions, 'formGroupCssClass', '');
  }

  getLabelCssClass(fieldData: DynamicField): string {
    const fieldDataOptions: DynamicFieldOption[] = fieldData.options || [];

    return getFieldDataOptionValue(fieldDataOptions, 'labelCssClass', '');
  }

  needToShowLabelOutside(fieldData: DynamicField): boolean {
    return needToShowLabelOutside(fieldData, this.config);
  }
}
