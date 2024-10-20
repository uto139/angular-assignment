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
  appMessage: string = 'Hey blogger!';

  constructor(
    private readonly client: BlogPostsClient,
    private readonly dialog: MatDialog
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
    const dialogRef = this.dialog.open(BlogPostEditDialogComponent, {
      data: { id: null, title: '', text: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPosts();
      }
    });
  }
}
