import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogPost } from '@api';
import { Observable } from 'rxjs';
import { BlogPostEditDialogComponent } from '../blog-post-edit-dialog.component';

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