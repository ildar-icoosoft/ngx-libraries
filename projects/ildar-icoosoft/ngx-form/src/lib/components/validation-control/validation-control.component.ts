import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ii-validation-control',
  templateUrl: './validation-control.component.html',
  styleUrls: ['./validation-control.component.css']
})
export class ValidationControlComponent {
  @Input()
  control: FormControl;

  constructor() {}

}
