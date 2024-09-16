import { Component, Input } from '@angular/core';
import { GetBlogPostsResponse } from '@api';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})

export class BlogPostComponent {
  @Input() post: GetBlogPostsResponse;
}
