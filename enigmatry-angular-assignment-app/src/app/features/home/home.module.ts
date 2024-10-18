import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogPostModule } from '@features/blog-posts/blog-post.module';
import { HomeComponent } from '@features/home/home.component';
import { NotificationModule } from '@shared/components/notification/notification.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BlogPostModule,
    NotificationModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
