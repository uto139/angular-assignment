import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostsClient, GetBlogPostsResponse } from '@api';
import { BlogPostDialogService } from '@features/blogs/blog-post-edit-dialog/services/blog-post-dialog.service';
import { GetBlogPostsQuery } from './models/get-blog-posts-query';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: GetBlogPostsResponse[] = [];
  query: GetBlogPostsQuery = new GetBlogPostsQuery();

  readonly labels = {
    title: $localize`:@@blogs.blog.title:Welcome to My Blog`,
    addPost: $localize`:@@blogs.blog.action.add:Add post`
  };

  constructor(
    private readonly client: BlogPostsClient,
    private readonly route: ActivatedRoute,
    private readonly blogPostDialogService: BlogPostDialogService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query.applyRouteChanges(params);
      this.loadPosts();
    });
  }

  readonly loadPosts = () => {
    const keyword = this.query.keyword.value;
    const category = this.query.category.value;
    this.client.search(keyword, category).subscribe(response => {
      this.posts = response;
    });
  };

  readonly openCreateDialog = () => {
    this.blogPostDialogService.openCreateDialog().subscribe(result => {
      if (result) {
        this.loadPosts();
      }
    });
  };
}
