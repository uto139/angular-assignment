import { NgModule } from '@angular/core';
import { HomeComponent } from '@features/home/home.component';
import { BlogPostComponent } from '../blog-post/blog-post.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BlogPostComponent
],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
