import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BlogPostEditDialogComponent } from './blog-post-edit-dialog/blog-post-edit-dialog.component';
import { BlogPostComponent } from './blog-post-list/blog-post/blog-post.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';
import { BlogComponent } from './blog.component';
import { BlogsRoutingModule } from './blogs-routing.module';

@NgModule({
  declarations: [
    BlogPostComponent,
    BlogPostListComponent,
    BlogPostEditDialogComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogsRoutingModule
  ]
})
export class BlogsModule { }
