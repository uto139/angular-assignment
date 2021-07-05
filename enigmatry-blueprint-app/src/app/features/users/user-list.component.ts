import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUsersResponseItem, UsersClient } from 'src/app/api/api-reference';
import { ListComponentWithRouting } from 'src/app/shared/list-component/list-component-with-routing.model';
import { GetUsersQuery } from './models/get-users-query.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends ListComponentWithRouting<GetUsersResponseItem, GetUsersQuery> implements OnInit {

  constructor(private client: UsersClient, protected router: Router, protected activatedRoute: ActivatedRoute) {
    super();

    this.query = new GetUsersQuery();
    this.fetchData = (query: GetUsersQuery) => this.client.search(...query.getApiMethodParams());
  }

  ngOnInit(): void {
    this.watchRouteParams(this.router, this.activatedRoute);
  }
}