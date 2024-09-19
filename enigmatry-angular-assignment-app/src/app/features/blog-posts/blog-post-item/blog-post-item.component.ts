import { Component, Input } from '@angular/core';
import { GetBlogPostsResponse } from '@api';

@Component({
  selector: 'app-blog-post-item',
  templateUrl: './blog-post-item.component.html',
  styleUrls: ['./blog-post-item.component.scss']
})

export class BlogPostItemComponent {
  @Input() post: GetBlogPostsResponse;
}
