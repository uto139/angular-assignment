import { Component, OnInit } from '@angular/core';
import { BlogPostsClient, GetBlogPostsResponse } from '@api';
import { BlogPostDialogService } from '@features/blog-posts/services/blog-post-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: GetBlogPostsResponse[] = [];
  appMessage: string = 'Hey blogger!';

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