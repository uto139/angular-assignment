import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NotificationModule } from '@shared/components/notification/notification.module';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogPostEditDialogComponent } from './blog-post-edit-dialog/blog-post-edit-dialog.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';
import { BlogComponent } from './blog.component';

@NgModule({
  declarations: [
    BlogPostComponent,
    BlogPostListComponent,
    BlogPostEditDialogComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule
  ]
})
export class BlogModule { }
