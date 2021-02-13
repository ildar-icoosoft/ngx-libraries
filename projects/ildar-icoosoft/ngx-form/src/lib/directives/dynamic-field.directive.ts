import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  forwardRef,
  Inject,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NGX_FORM_MODULE_CONFIG} from '../constants/ngx-form-module-config';
import {NgxFormModuleConfig, DynamicField} from '../types';

@Directive({
  selector: '[iiDynamicField]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFieldDirective),
      multi: true
    }
  ]
})
export class DynamicFieldDirective implements OnInit, ControlValueAccessor {

  @Input() fieldData!: DynamicField;
  @Input() inputId!: string;

  component!: ComponentRef<ControlValueAccessor>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig
  ) {
  }

  ngOnInit(): void {
    const fieldData: DynamicField = this.fieldData;

    const itemConfig = this.config.fields[fieldData.type];

    if (!itemConfig) {
      const supportedTypes: string = Object.keys(this.config.fields).join(', ');
      throw Error(
        `Trying to use an unsupported type (${fieldData.type}).
        Supported types: ${supportedTypes}`
      );
    }

    const componentFactory: ComponentFactory<ControlValueAccessor> =
      this.componentFactoryResolver.resolveComponentFactory(itemConfig.component);

    this.component = this.viewContainerRef.createComponent(componentFactory);

    const props: Record<string, any> = {};

    if (this.inputId) {
      props.inputId = this.inputId;
    }

    if (itemConfig.props) {
      Object.assign(props, itemConfig.props);
    }
    if (itemConfig.mapConnectDataToProps) {
      Object.assign(props, itemConfig.mapConnectDataToProps(fieldData));
    }

    Object.assign(this.component.instance, props);

    this.component.changeDetectorRef.detectChanges();
  }

  registerOnChange(fn: any): void {
    if (!this.component || !this.component.instance) {
      return;
    }

    return this.component.instance.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    if (!this.component || !this.component.instance) {
      return;
    }

    return this.component.instance.registerOnTouched(fn);
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

    // @ts-ignore
    this.component.instance.setDisabledState(isDisabled);
  }

}
