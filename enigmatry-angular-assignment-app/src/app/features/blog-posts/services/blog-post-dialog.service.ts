import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogPost } from '@api';
import { BlogPostEditDialogComponent } from '@features/blog-posts/blog-post-edit-dialog/blog-post-edit-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogPostDialogService {
  constructor(
    private readonly dialog: MatDialog
  ) {}

  openCreateDialog(): Observable<any> {
    const dialogRef = this.dialog.open(BlogPostEditDialogComponent, {
      data: { id: null, title: '', text: '', createdOn: new Date(), categories: [] }
    });

    return dialogRef.afterClosed();
  }

  openEditDialog(blogPost: BlogPost): Observable<any> {
    const dialogRef = this.dialog.open(BlogPostEditDialogComponent, {
      data: blogPost
    });

    return dialogRef.afterClosed();
  }
}