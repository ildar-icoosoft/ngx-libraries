import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'ii-form-validation-errors',
  templateUrl: './form-validation-errors.component.html',
  styleUrls: ['./form-validation-errors.component.css']
})
export class FormValidationErrorsComponent implements OnInit {

  @Input()
  group: FormGroup;

  constructor() {}

  ngOnInit(): void {}

}
