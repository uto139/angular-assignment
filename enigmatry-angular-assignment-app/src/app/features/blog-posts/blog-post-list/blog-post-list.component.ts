import { Component, Input, OnInit } from '@angular/core';
import { BlogPostsClient, GetBlogPostsResponse } from '@api';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {
  @Input() posts: GetBlogPostsResponse[];


  constructor(private readonly client: BlogPostsClient) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.client.getAll().subscribe(response => {
      this.posts = response;
    });
  }

  onPostDeleted(): void {
    this.loadPosts();
  }
}
