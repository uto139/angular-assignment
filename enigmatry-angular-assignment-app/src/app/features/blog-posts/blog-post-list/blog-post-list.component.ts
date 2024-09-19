import { Component, Input } from '@angular/core';
import { GetBlogPostsResponse } from '@api';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.scss'
})

export class BlogPostListComponent {
  @Input() posts: GetBlogPostsResponse[];
}
