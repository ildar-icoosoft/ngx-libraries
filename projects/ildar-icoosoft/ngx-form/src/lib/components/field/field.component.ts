import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Inject,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentFactory,
  ComponentRef,
  forwardRef,
  AfterViewInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DynamicField, DynamicFieldOption, NgxFormModuleConfig } from '../../types';
import { getFieldDataOptionValue, needToShowLabelOutside } from '../../utils/dynamic-form';
import { NGX_FORM_MODULE_CONFIG } from '../../constants/ngx-form-module-config';
import { FieldComponentType } from '../../types/field-component-type';

@Component({
  selector: 'ii-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => FieldComponent),
      multi: true,
    },
  ],
})
export class FieldComponent implements AfterViewInit, ControlValueAccessor, FieldComponentType {
  @Input() fieldData!: DynamicField;

  @Input() formControl?: FormControl;

  @Input() formControlName?: string;

  // @see https://stackoverflow.com/a/64493999/1740116
  get control(): FormControl {
    if (this.formControl) {
      return this.formControl;
    }

    return (this.controlContainer.control as AbstractControl).get(
      this.formControlName as string,
    ) as FormControl;
  }

  @Input() index = 0;

  @ViewChild('inputEl', { read: ViewContainerRef }) inputRef!: ViewContainerRef;

  private component!: ComponentRef<Component & ControlValueAccessor>;

  private controlOnChangeFn = () => {};

  private controlOnTouchedFn = () => {};

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig,
    private controlContainer: ControlContainer,
  ) {}

  ngAfterViewInit(): void {
    const { fieldData, index } = this;

    const itemConfig = this.config.fields[fieldData.type];

    if (!itemConfig) {
      const supportedTypes: string = Object.keys(this.config.fields).join(', ');
      throw Error(
        `Trying to use an unsupported type (${fieldData.type}).
        Supported types: ${supportedTypes}`,
      );
    }

    const componentFactory: ComponentFactory<ControlValueAccessor> = this.componentFactoryResolver.resolveComponentFactory(
      itemConfig.component,
    );

    this.component = this.inputRef.createComponent(componentFactory);

    const props: Record<string, any> = {};

    props.inputId = `${fieldData.name}_${index}`;

    if (itemConfig.props) {
      Object.assign(props, itemConfig.props);
    }
    if (itemConfig.mapConnectDataToProps) {
      Object.assign(props, itemConfig.mapConnectDataToProps(fieldData));
    }

    Object.assign(this.component.instance, props);

    this.component.instance.registerOnChange(this.controlOnChangeFn);
    this.component.instance.registerOnTouched(this.controlOnTouchedFn);

    this.component.changeDetectorRef.detectChanges();
  }

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

  getFormElement(): Component & ControlValueAccessor {
    return this.component.instance;
  }

  registerOnChange(fn: any): void {
    this.controlOnChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.controlOnTouchedFn = fn;
  }

  writeValue(value: string | undefined): void {
    if (!this.component || !this.component.instance) {
      return;
    }
    this.component.instance.writeValue(value);
  }

  setDisabledState(isDisabled: boolean): void {
    if (!this.component || !this.component.instance) {
      return;
    }
    if (this.component.instance.setDisabledState) {
      this.component.instance.setDisabledState(isDisabled);
    }
  }
}
