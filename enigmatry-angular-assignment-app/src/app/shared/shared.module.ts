import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from './components/dialog/dialogs.module';
import { NavigationComponentsModule } from './components/navigation/navigation.module';
import { NotificationModule } from './components/notification/notification.module';
import { EntryComponentsModule } from './entry-components.module';
import { MaterialModule } from './material.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    EntryComponentsModule
    ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EntryComponentsModule,
    NavigationComponentsModule,
    DialogsModule,
    NotificationModule,
    PipesModule
  ],
  declarations: [
  ]
})
export class SharedModule { }
