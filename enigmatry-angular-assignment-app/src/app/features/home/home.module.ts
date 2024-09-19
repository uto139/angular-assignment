import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogPostModule } from '@features/blog-posts/blog-post.module';
import { HomeComponent } from '@features/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BlogPostModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
