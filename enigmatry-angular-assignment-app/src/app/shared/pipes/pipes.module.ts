import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotNullPipe } from './not-null.pipe';
import { OrderByDatePipe } from './order-by-date.pipe';

@NgModule({
    declarations: [
        NotNullPipe,
        OrderByDatePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NotNullPipe,
        OrderByDatePipe
    ]
})
export class PipesModule { }