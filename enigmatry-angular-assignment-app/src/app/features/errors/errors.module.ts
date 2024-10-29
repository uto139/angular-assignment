import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorComponent } from './error.component';
import { ErrorsRoutingModule } from './errors-routing.module';

@NgModule({
    declarations: [
        ErrorComponent
    ],
    imports: [
        ErrorsRoutingModule,
        SharedModule,
        CommonModule
    ]
})
export class ErrorsModule { }
