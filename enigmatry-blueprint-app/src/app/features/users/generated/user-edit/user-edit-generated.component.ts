// ------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
// ------------------------------------------------------------------------------;
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IGetUserDetailsResponse } from 'src/app/api/api-reference';

@Component({
  selector: 'app-g-user-edit',
  templateUrl: './user-edit-generated.component.html',
  styleUrls: ['./user-edit-generated.component.scss']
})
export class UserEditGeneratedComponent implements OnInit {

  @Input() model: IGetUserDetailsResponse = {};

  @Output() save = new EventEmitter<IGetUserDetailsResponse>();
  @Output() cancel = new EventEmitter<void>();

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];

  constructor() {
    this.fields = [     {
        key: 'userName',
        type: 'input',
        templateOptions: {
          label: 'User name',
          placeholder: 'User name',
          readonly: true,
          description: '',
          hidden: !true,
        },
     },
     {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Name',
          placeholder: 'Name',
          readonly: false,
          description: '',
          hidden: !true,
required: true,
minLength: 5,
maxLength: 25,
        },
        validation: {
          messages: {
required: 'Name is required',
minLength: 'Name min length is 5',
maxLength: 'Name should have less then 25 characters'
          }
        },
     },
     {
        key: 'age',
        type: 'input',
        templateOptions: {
          label: 'Age',
          placeholder: 'Age',
          readonly: false,
          description: '',
          hidden: !true,
type: 'number',
required: true,
min: 1,
max: 100,
        },
        validation: {
          messages: {
required: 'Age is required',
min: 'Age should be more then 1',
max: 'Max age is 100'
          }
        },
     },
     {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          placeholder: 'Email',
          readonly: false,
          description: '',
          hidden: !true,
required: true,
pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        },
        validation: {
          messages: {
required: 'Email is required',
pattern: 'Must be in email format (e.g. john.doe@google.com)'
          }
        },
     },
     {
        key: 'createdOn',
        type: 'datepicker',
        templateOptions: {
          label: 'Created on',
          placeholder: 'Created on',
          readonly: true,
          description: '',
          hidden: !true,
        },
     },
     {
        key: 'updatedOn',
        type: 'datepicker',
        templateOptions: {
          label: 'Updated on',
          placeholder: 'Updated on',
          readonly: true,
          description: '',
          hidden: !true,
        },
     },
];
 }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.model);
    }
  }
}
