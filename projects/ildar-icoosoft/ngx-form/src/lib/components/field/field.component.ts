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
  Output,
  EventEmitter,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeService } from 'ii-ngx-common';
import {
  DynamicField,
  DynamicFieldOption,
  NgxFormModuleConfig,
  FieldComponentType,
  FieldsetComponentType,
} from '../../types';
import { getFieldDataOptionValue, needToShowLabelOutside } from '../../utils/dynamic-form';
import { NGX_FORM_MODULE_CONFIG } from '../../constants/ngx-form-module-config';

// eslint-disable-next-line import/no-cycle
import { FieldsetComponent } from '..';
import { LoadDictionaryEvent } from '../../types/load-dictionary-event';
import { ComponentWithDictionary } from '../../types/component-with-dictionary';
import { DynamicFieldDictionary } from '../../types/dynamic-field-dictionary';

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

  @Input() group!: FormGroup;

  @Output() loadDictionary = new EventEmitter<LoadDictionaryEvent>();

  @ViewChild('inputEl', { read: ViewContainerRef }) inputRef!: ViewContainerRef;

  readonly hidden!: boolean;

  dictionaryIsLoading = false;

  loadDictionaryError: string | null = null;

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
    public cdr: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig,
    private controlContainer: ControlContainer,
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

    if (fieldData.dictionary) {
      const componentWithDictionary = this.component.instance as Component &
        ControlValueAccessor &
        ComponentWithDictionary;

      this.emitLoadDictionaryEvent(
        fieldData.dictionary,
        componentWithDictionary,
        this.group.getRawValue(),
      );

      if (fieldData.dictionary.relations) {
        const relations = fieldData.dictionary.relations as Record<string, string>;

        Object.keys(relations).forEach((relationKey) => {
          const controlName = relations[relationKey];

          this.group.controls[controlName].valueChanges
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((value) => {
              this.emitLoadDictionaryEvent(
                fieldData.dictionary as DynamicFieldDictionary,
                componentWithDictionary,
                {
                  ...this.group.getRawValue(),
                  [controlName]: value,
                },
              );
            });
        });
      }
    }

    if (this.fieldData.type === 'fieldset') {
      const fieldsetComponent = this.component.instance as Component &
        ControlValueAccessor &
        FieldsetComponentType;

      fieldsetComponent.loadDictionary
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((event: LoadDictionaryEvent) => {
          this.loadDictionary.emit(event);
        });
    }

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

  private emitLoadDictionaryEvent(
    dictionary: DynamicFieldDictionary,
    componentWithDictionary: Component & ControlValueAccessor & ComponentWithDictionary,
    groupValue: Record<string, unknown>,
  ): void {
    this.dictionaryIsLoading = true;
    this.loadDictionaryError = null;

    // на проде markForCheck почему-то не запускает перерисовку (в сторибуке markForCheck работает)
    this.cdr.detectChanges();

    this.loadDictionary.emit({
      name: dictionary.name,
      filter: this.getDictionaryRelationValues(dictionary, groupValue),
      setOptions: (options) => {
        this.dictionaryIsLoading = false;
        componentWithDictionary.setOptions(options);
        this.cdr.detectChanges();
      },
      setError: (error) => {
        this.loadDictionaryError = error;
        this.dictionaryIsLoading = false;
        // на проде markForCheck почему-то не запускает перерисовку (в сторибуке markForCheck работает)
        this.cdr.detectChanges();
      },
    });
  }

  private getDictionaryRelationValues(
    dictionary: DynamicFieldDictionary,
    groupValue: Record<string, unknown>,
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    if (dictionary.relations) {
      const relations = dictionary.relations as Record<string, string>;

      Object.keys(relations).forEach((relationKey) => {
        const controlName = relations[relationKey];
        result[relationKey] = groupValue[controlName];
      });
    }

    return result;
  }
}
