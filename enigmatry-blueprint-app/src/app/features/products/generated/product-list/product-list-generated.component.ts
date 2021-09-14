// ------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
// ------------------------------------------------------------------------------;
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CellTemplate, ColumnDef, ContextMenuItem } from '@enigmatry/angular-building-blocks/enigmatry-grid';
import { PagedData, PageEvent, SortEvent } from '@enigmatry/angular-building-blocks/pagination';

import { GetProductsResponseItem } from 'src/app/api/api-reference';

@Component({
  selector: 'app-g-product-list',
  templateUrl: './product-list-generated.component.html',
  styleUrls: ['./product-list-generated.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListGeneratedComponent implements OnInit {

  @Input() data: PagedData<GetProductsResponseItem> | null;
  @Input() loading: boolean;

  @Input() showPaginator = true;
  @Input() showFirstLastButtons = false;
  @Input() pageSizeOptions = [10, 50, 100];
  @Input() hidePageSize = !true;

  @Input() rowSelectable = true;
  @Input() multiSelectable = false;

  @Input() headerTemplate: TemplateRef<any> | CellTemplate;
  @Input() cellTemplate: TemplateRef<any> | CellTemplate;

  @Input() showContextMenu = true;
  @Input() contextMenuItems: ContextMenuItem[] = [];

  @Input() columns: ColumnDef[] = [];

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<SortEvent>();
  @Output() selectionChange = new EventEmitter<GetProductsResponseItem[]>();
  @Output() contextMenuItemSelected = new EventEmitter<{ itemId: string; rowData: GetProductsResponseItem }>();
  @Output() rowClick = new EventEmitter<GetProductsResponseItem>();



  constructor() { }

  ngOnInit(): void {
    this.columns = [
{ field: 'id', header: 'Id', hide: true, sortable: true },
{ field: 'name', header: 'Name', hide: false, sortable: true },
{ field: 'code', header: 'Code', hide: false, sortable: true },
{ field: 'type', header: 'Type', hide: false, sortable: true },
{ field: 'price', header: 'Price', hide: false, sortable: true, type: 'number', typeParameter: undefined },
{ field: 'contactEmail', header: 'Contact email', hide: false, sortable: true },
{ field: 'contactPhone', header: 'Contact phone', hide: false, sortable: true },
{ field: 'expiresOn', header: 'Expires on', hide: false, sortable: true }
];
    this.contextMenuItems = [
{ id: 'edit', name: 'Edit', icon: 'edit' }
];
  }
}
