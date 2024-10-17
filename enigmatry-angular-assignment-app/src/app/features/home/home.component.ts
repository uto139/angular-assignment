import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogPostsClient, GetBlogPostsResponse } from '@api';
import { BlogPostEditDialogComponent } from '@features/blog-posts/blog-post-edit-dialog/blog-post-edit-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: GetBlogPostsResponse[] = [];

  constructor(
    private client: BlogPostsClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.client.getAll().subscribe((data: GetBlogPostsResponse[]) => {
      this.posts = data;
    });
  }

  openCreateDialog(): void {
    this.dialog.open(BlogPostEditDialogComponent, {
      data: { id: null, title: '', text: '' }
    });
  }
}
