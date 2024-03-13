// ------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
// ------------------------------------------------------------------------------;
/* eslint-disable */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { PagedData, SortDirection, CellTemplate, ContextMenuItem, RowContextMenuFormatter, RowClassFormatter, RowSelectionFormatter, ColumnDef, PageEvent, SortEvent } from '@enigmatry/entry-components/table';

import { GetProductsResponseItem } from '@api';

@Component({
  selector: 'app-g-product-list',
  templateUrl: './product-list-generated.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListGeneratedComponent implements OnInit {

  @Input() data: PagedData<GetProductsResponseItem> | null;
  @Input() loading: boolean;

  @Input() showPaginator = true;
  @Input() showFirstLastButtons = true;
  @Input() pageSizeOptions = [20, 50, 100];
  @Input() hidePageSize = !true;

  @Input() defaultSort: { sortBy?: string | undefined, sortDirection?: SortDirection } = { };

  @Input() rowSelectable = false;
  @Input() multiSelectable = false;
  @Input() showSelectAllCheckbox = true;
  @Input() rowSelected: GetProductsResponseItem[] = [];

  @Input() headerTemplate: TemplateRef<any> | CellTemplate;
  @Input() cellTemplate: TemplateRef<any> | CellTemplate;

  @Input() noResultText: string;
  @Input() noResultTemplate: TemplateRef<any> | null;

  @Input() showContextMenu = true;
  @Input() contextMenuItems: ContextMenuItem[] = [];
  @Input() rowContextMenuFormatter: RowContextMenuFormatter;

  @Input() rowClassFormatter: RowClassFormatter;
  @Input() rowSelectionFormatter: RowSelectionFormatter = {};

  @Input() columns: ColumnDef[] = [];

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<SortEvent>();
  @Output() selectionChange = new EventEmitter<GetProductsResponseItem[]>();
  @Output() contextMenuItemSelected = new EventEmitter<{ itemId: string; rowData: GetProductsResponseItem }>();
  @Output() rowClick = new EventEmitter<GetProductsResponseItem>();

@ViewChild('nameTpl', { static: true }) nameTpl: TemplateRef<any>;
@ViewChild('typeTpl', { static: true }) typeTpl: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
   this.columns = [
{ field: 'id', hide: true, sortable: true },
{ field: 'name', header: $localize `:@@products.product-list.name:Product name`, hide: false, sortable: true, cellTemplate: this.nameTpl },
{ field: 'code', header: $localize `:@@products.product-list.code:Code`, hide: false, sortable: true, class: 'hide-on-mobile ' },
{ field: 'type', header: $localize `:@@products.product-list.type:Type`, hide: false, sortable: true, cellTemplate: this.typeTpl },
{ field: 'price', header: $localize `:@@products.price:Price per unit`, hide: false, sortable: true, type: 'currency', typeParameter: { name: 'currency', currencyCode: 'EUR', display: '€', digitsInfo: '', locale: '' }, class: 'products-price' },
{ field: 'amount', header: $localize `:@@products.amount:Units`, hide: false, sortable: true },
{ field: 'contactEmail', header: $localize `:@@products.product-list.contact-email:Contact email`, hide: false, sortable: true, class: 'hide-on-mobile ' },
{ field: 'contactPhone', header: $localize `:@@products.product-list.contact-phone:Contact phone`, hide: false, sortable: true, class: 'hide-on-mobile ' },
{ field: 'infoLink', hide: true, sortable: true },
{ field: 'expiresOn', header: $localize `:@@products.product-list.expires-on:Expires on`, hide: false, sortable: true, type: 'date', typeParameter: { name: 'date' }, class: 'hide-on-mobile hide-on-tablet' },
{ field: 'freeShipping', header: $localize `:@@products.product-list.free-shipping:Free shipping`, hide: false, sortable: true, type: 'boolean', typeParameter: { name: 'boolean' }, class: 'hide-on-mobile ' },
{ field: 'hasDiscount', hide: true, sortable: true, type: 'boolean', typeParameter: { name: 'boolean' } },
{ field: 'discount', hide: true, sortable: true, type: 'number', typeParameter: { name: 'number' } }
];
  }
}
