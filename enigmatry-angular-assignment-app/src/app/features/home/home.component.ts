import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogPostsClient, GetBlogPostsResponse } from '@api';
import { SearchService } from '@app/services/search.service';
import { BlogPostEditDialogComponent } from '@features/blog-posts/blog-post-edit-dialog/blog-post-edit-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: GetBlogPostsResponse[] = [];

  constructor(
    private readonly client: BlogPostsClient,
    private readonly dialog: MatDialog,
    private readonly searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.loadPosts();

    this.searchService.searchResults$.subscribe(results => {
      this.posts = results;
    });
  }

  loadPosts(): void {
    this.client.getAll().subscribe((data: GetBlogPostsResponse[]) => {
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
