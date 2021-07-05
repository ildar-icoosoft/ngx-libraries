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
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeService } from 'ii-ngx-common';
import { DynamicField, DynamicFieldOption, NgxFormModuleConfig } from '../../types';
import { getFieldDataOptionValue, needToShowLabelOutside } from '../../utils/dynamic-form';
import { NGX_FORM_MODULE_CONFIG } from '../../constants/ngx-form-module-config';
import { FieldComponentType } from '../../types/field-component-type';
// eslint-disable-next-line import/no-cycle
import { FieldsetComponent } from '../fieldset/fieldset.component';

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
    UnsubscribeService,
  ],
})
export class FieldComponent
  implements AfterViewInit, OnInit, ControlValueAccessor, FieldComponentType {
  @Input() fieldData!: DynamicField;

  @Input() formControl?: FormControl;

  @Input() formControlName?: string;

  @Input() index = 0;

  @ViewChild('inputEl', { read: ViewContainerRef }) inputRef!: ViewContainerRef;

  readonly hidden!: boolean;

  private writeValueSubject = new ReplaySubject<unknown>(1);

  private setDisabledStateSubject = new ReplaySubject<boolean>(1);

  // @see https://stackoverflow.com/a/64493999/1740116
  get control(): FormControl {
    if (this.formControl) {
      return this.formControl;
    }

    return (this.controlContainer.control as AbstractControl).get(
      this.formControlName as string,
    ) as FormControl;
  }

  private component!: ComponentRef<Component & ControlValueAccessor>;

  private controlOnChangeFn = () => {};

  private controlOnTouchedFn = () => {};

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig,
    private controlContainer: ControlContainer,
    private cdr: ChangeDetectorRef,
    private ngUnsubscribe$: UnsubscribeService,
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

    this.component.changeDetectorRef.detectChanges();

    this.component.instance.registerOnChange(this.controlOnChangeFn);
    this.component.instance.registerOnTouched(this.controlOnTouchedFn);

    this.writeValueSubject.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value) => {
      this.component.instance.writeValue(value);
      this.component.changeDetectorRef.detectChanges();
    });

    this.setDisabledStateSubject.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((isDisabled) => {
      if (this.component.instance.setDisabledState) {
        this.component.instance.setDisabledState(isDisabled);
        this.component.changeDetectorRef.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    (this as { hidden: boolean }).hidden = this.fieldData.hidden || false;
  }

  getCssClass(): string {
    const fieldDataOptions: DynamicFieldOption[] = this.fieldData.options || [];

    return getFieldDataOptionValue(fieldDataOptions, 'cssClass', '');
  }

  getFieldsetItem(name: string): FieldComponentType {
    if (this.fieldData.type !== 'fieldset') {
      throw Error(`getFieldsetItem is allowed only for fieldset component`);
    }

    const formElement = this.getFormElement() as FieldsetComponent;

    return formElement.getFieldsetItem(name);
  }

  hide(): void {
    (this as { hidden: boolean }).hidden = true;
    this.cdr.markForCheck();
  }

  show(): void {
    (this as { hidden: boolean }).hidden = false;
    this.cdr.markForCheck();
  }

  toggle(): void {
    (this as { hidden: boolean }).hidden = !this.hidden;
    this.cdr.markForCheck();
  }

  getFormGroupCssClass(): string {
    const fieldDataOptions: DynamicFieldOption[] = this.fieldData.options || [];

    return getFieldDataOptionValue(fieldDataOptions, 'formGroupCssClass', '');
  }

  getLabelCssClass(): string {
    const fieldDataOptions: DynamicFieldOption[] = this.fieldData.options || [];

    return getFieldDataOptionValue(fieldDataOptions, 'labelCssClass', '');
  }

  needToShowLabelOutside(): boolean {
    return needToShowLabelOutside(this.fieldData, this.config);
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
    this.writeValueSubject.next(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.setDisabledStateSubject.next(isDisabled);
  }
}
