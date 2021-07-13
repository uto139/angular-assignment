// ------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
// ------------------------------------------------------------------------------;
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CellTemplate, ColumnDef, ContextMenuItem } from '@enigmatry/enigmatry-grid';
import { PagedData, PageEvent, SortEvent } from '@enigmatry/pagination';

import { GetUsersResponseItem } from 'src/app/api/api-reference';

@Component({
  selector: 'app-g-user-list',
  templateUrl: './user-list-generated.component.html',
  styleUrls: ['./user-list-generated.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListGeneratedComponent implements OnInit {

  @Input() data: PagedData<GetUsersResponseItem> | null;
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
  @Output() selectionChange = new EventEmitter<GetUsersResponseItem[]>();
  @Output() contextMenuItemSelected = new EventEmitter<{ itemId: string; rowData: GetUsersResponseItem }>();

  

  constructor() {
    this.columns = [
{ field: 'id', header: 'Id', hide: true, sortable: true },
{ field: 'userName', header: 'E-mail', hide: false, sortable: true },
{ field: 'name', header: 'Name', hide: false, sortable: true },
{ field: 'createdOn', header: 'Created on', hide: false, sortable: true, type: 'date', typeParameter: undefined },
{ field: 'updatedOn', header: 'Updated on', hide: false, sortable: true, type: 'date', typeParameter: undefined }
];
    this.contextMenuItems = [
{ id: 'edit', name: 'Edit' },
{ id: 'delete', name: 'Delete' }
];
  }

  ngOnInit(): void {
  }
}
