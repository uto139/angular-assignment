import { Component, OnInit } from '@angular/core';
import { BlogPostsClient, GetBlogPostsResponse } from '@api';
import { BlogPostDialogService } from '@features/blogs/blog-post-edit-dialog/services/blog-post-dialog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: GetBlogPostsResponse[] = [];

  readonly labels = {
    title: $localize`:@@blogs.blog.title:Welcome to My Blog`,
    addPost: $localize`:@@blogs.blog.action.add:Add post`
  };

  constructor(
    private readonly client: BlogPostsClient,
    private readonly blogPostDialogService: BlogPostDialogService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.client.search().subscribe((data: GetBlogPostsResponse[]) => {
      this.posts = data;
    });
  }

  openCreateDialog(): void {
    this.blogPostDialogService.openCreateDialog().subscribe(result => {
      if (result) {
        this.loadPosts();
      }
    });
  }
}