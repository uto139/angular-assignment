import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogPostComponent } from '@features/blog-post/blog-post.component';
import { HomeComponent } from '@features/home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    BlogPostComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
