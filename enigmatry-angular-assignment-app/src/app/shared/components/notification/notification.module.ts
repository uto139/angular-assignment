import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApplicationMessageComponent } from './application-message/application-message.component';

@NgModule({
    imports: [CommonModule],
    exports: [ApplicationMessageComponent],
    declarations: [ApplicationMessageComponent]
})
export class NotificationModule { }