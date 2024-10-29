import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { AcceptLanguageInterceptor } from '@enigmatry/entry-components';
import { GlobalErrorHandler } from '@services/global-error-handler';
import { PageTitleStrategy } from '@services/page-title-strategy';
import { provideCurrencyCode, provideDatePipeOptions } from './i18n/localization';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  imports: [],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AcceptLanguageInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
  },
    provideCurrencyCode(),
    provideDatePipeOptions()
  ]
})
export class CoreModule { }
