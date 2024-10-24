import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostsClient, GetBlogPostsResponse } from '@api';
import { GetBlogPostsQuery } from '@features/blogs/models/get-blog-posts-query';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {
  @Input() posts: GetBlogPostsResponse[];
  query: GetBlogPostsQuery = new GetBlogPostsQuery();

  constructor(
    private readonly client: BlogPostsClient,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query.applyRouteChanges(params);
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

  onPostDeleted(deletedPost: GetBlogPostsResponse): void {
    this.posts = this.posts.filter(post => post.id !== deletedPost.id);
  }

  onFilterChange(searchParams: any): void {
    this.query.searchFilterChange(searchParams);
    const queryParams = this.query.getRouteQueryParams();
    this.router.navigate([], { queryParams });
  }
}
