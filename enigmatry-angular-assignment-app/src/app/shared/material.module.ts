/* eslint-disable import/max-dependencies */
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { provideMatDateFormats, provideMatDateLocale } from '../core/i18n/localization';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatDateFnsModule,
    MatMenuModule
  ],
  providers: [
    provideMatDateLocale(),
    provideMatDateFormats(),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', floatLabel: 'auto' } }
  ]
})
export class MaterialModule { }
