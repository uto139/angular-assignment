// ------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
// ------------------------------------------------------------------------------;
/* eslint-disable */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntryTableModule } from '@enigmatry/entry-components/table';
    import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
    import { FormlyMaterialModule } from '@ngx-formly/material';
    import { MatAutocompleteModule } from '@angular/material/autocomplete';
    import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';

import { ProductEditGeneratedComponent } from './product-edit/product-edit-generated.component';
import { ProductListGeneratedComponent } from './product-list/product-list-generated.component';

import { CustomValidatorsService, customValidatorsFactory } from 'src/app/shared/validators/custom-validators';

@NgModule({
    declarations: [ProductEditGeneratedComponent, ProductListGeneratedComponent],
    imports: [
    CommonModule,
    SharedModule,
    EntryTableModule,
        MatAutocompleteModule,
        FormlyModule.forChild(
            {
                validationMessages: [
{ name: 'required', message: (err, field) => $localize `:@@validators.required:${field?.templateOptions?.label}:property-name: is required` },
{ name: 'minLength', message: (err, field) => $localize `:@@validators.minLength:${field?.templateOptions?.label}:property-name: should have at least ${field?.templateOptions?.minLength}:min-value: characters` },
{ name: 'maxLength', message: (err, field) => $localize `:@@validators.maxLength:${field?.templateOptions?.label}:property-name: value should be less than ${field?.templateOptions?.maxLength}:max-value: characters` },
{ name: 'min', message: (err, field) => $localize `:@@validators.min:${field?.templateOptions?.label}:property-name: value should be more than ${field?.templateOptions?.min}:min-value:` },
{ name: 'max', message: (err, field) => $localize `:@@validators.max:${field?.templateOptions?.label}:property-name: value should be less than ${field?.templateOptions?.max}:max-value:` },
{ name: 'pattern', message: (err, field) => $localize `:@@validators.pattern:${field?.templateOptions?.label}:property-name: is not in valid format` }
                ]
            }
        ),
        FormlyMaterialModule,
        FormlyMatDatepickerModule,
    ],
    exports: [ProductEditGeneratedComponent, ProductListGeneratedComponent],
    providers: [
CustomValidatorsService,
{ provide: FORMLY_CONFIG, multi: true, useFactory: customValidatorsFactory, deps: [ CustomValidatorsService ] }    ]
    })
    export class ProductsGeneratedModule { }
