import { HttpStatusCode } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';

const routes: Routes = [
    {
        path: ':code',
        component: ErrorComponent
    },
    {
        path: '**',
        redirectTo: HttpStatusCode.InternalServerError.toString()
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorsRoutingModule { }

