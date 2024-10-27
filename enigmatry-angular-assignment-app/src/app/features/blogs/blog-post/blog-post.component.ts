import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogPostsClient, GetBlogPostsResponse } from '@api';
import { BlogPostEditDialogComponent } from '../blog-post-edit-dialog/blog-post-edit-dialog.component';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent {
  @Input() post: GetBlogPostsResponse;
  @Output() postDeleted = new EventEmitter<GetBlogPostsResponse>();

  readonly labels = {
    edit: $localize`:@@blogPosts.blog-post-edit.action.edit:Edit`,
    delete: $localize`:@@blogPosts.blog-post-edit.action.delete:Delete`,
    postedBy: (user: string, date: string | null) =>
      $localize`:@@blogPosts.blog-post-edit.meta.postedByWithUserAndDate:Posted on ${date}:date: by ${user}:user:`
  };

  constructor(
    private readonly client: BlogPostsClient,
    private readonly dialog: MatDialog
  ) { }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(BlogPostEditDialogComponent, {
      data: {
        id: this.post.id,
        title: this.post.title,
        text: this.post.text,
        categories: this.post.categories,
        createdOn: this.post.createdOn
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.post = result;
      }
    });
  }

  onDelete(): void {
    if (this.post.id !== null) {
      this.client.delete(this.post.id ?? '').subscribe(() => {
        this.postDeleted.emit(this.post);
      });
    }
  }
}