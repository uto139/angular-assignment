import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderByDatePipe } from '@shared/pipes/order-by-date.pipe';
import { SharedModule } from '@shared/shared.module';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogPostEditDialogComponent } from './blog-post-edit-dialog/blog-post-edit-dialog.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';
import { BlogComponent } from './blog.component';
import { BlogsRoutingModule } from './blogs-routing.module';

@NgModule({
  declarations: [
    BlogPostComponent,
    BlogPostListComponent,
    BlogPostEditDialogComponent,
    BlogComponent,
    OrderByDatePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogsRoutingModule
  ]
})
export class BlogsModule { }
