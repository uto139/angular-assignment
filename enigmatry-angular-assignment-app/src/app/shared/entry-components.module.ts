import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntryButtonModule, provideEntryButtonConfig } from '@enigmatry/entry-components/button';
import { EntryCommonModule } from '@enigmatry/entry-components/common';
import { EntryDialogModule } from '@enigmatry/entry-components/dialog';
import { EntryFileInputModule } from '@enigmatry/entry-components/file-input';
import { EntrySearchFilterModule, provideEntrySearchFilterConfig } from '@enigmatry/entry-components/search-filter';
import { EntryTableModule } from '@enigmatry/entry-components/table';
import { EntryValidationModule } from '@enigmatry/entry-components/validation';

@NgModule({
  declarations: [],
  exports: [
    EntryButtonModule,
    EntryCommonModule,
    EntryDialogModule,
    EntryFileInputModule,
    EntryValidationModule,
    EntrySearchFilterModule,
    EntryTableModule
  ],
  providers: [
    provideEntryButtonConfig({
      submit: { type: 'raised', color: 'primary' },
      cancel: { type: 'basic' }
    }),
    provideEntrySearchFilterConfig({
      applyButtonText: 'Search'
    })
  ]
})
export class EntryComponentsModule {
  static forRoot(): ModuleWithProviders<EntryComponentsModule> {
    return {
      ngModule: EntryComponentsModule,
      providers: []
    };
  }
}
