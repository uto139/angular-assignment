import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GetBlogPostsResponse } from '@api';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostListComponent {
  @Input() posts: GetBlogPostsResponse[];
  @Output() postUpdated = new EventEmitter<void>();

  readonly onDeleted = (deletedPost: GetBlogPostsResponse) => {
    this.posts = this.posts.filter(post => post.id !== deletedPost.id);
  };

  readonly onUpdated = () => {
    this.postUpdated.emit();
  };
}
