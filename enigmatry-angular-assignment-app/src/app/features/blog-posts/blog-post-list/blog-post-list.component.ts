import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostsClient, GetBlogPostsResponse } from '@api';
import { GetBlogPostsQuery } from '@features/home/models/search-query';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {
  @Input() posts: GetBlogPostsResponse[];
  query: GetBlogPostsQuery = new GetBlogPostsQuery(); // Initialize the query object

  constructor(
    private readonly client: BlogPostsClient,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query.applyRouteChanges(params); // Apply changes based on the current route params
      this.loadPosts();
    });
  }

  loadPosts(): void {
    const keyword = this.query.keyword.value;
    const category = this.query.category.value;
    this.client.search(keyword, category).subscribe(response => {
      this.posts = response;
    });
  }

  onPostDeleted(): void {
    this.loadPosts();
  }

  onFilterChange(searchParams: any): void {
    this.query.searchFilterChange(searchParams); // Update the filters with the new search params
    const queryParams = this.query.getRouteQueryParams();
    this.router.navigate([], { queryParams });
  }
}
