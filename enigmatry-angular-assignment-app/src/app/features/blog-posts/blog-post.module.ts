import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogPostItemComponent } from './blog-post-item/blog-post-item.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';

@NgModule({
    declarations: [
        BlogPostItemComponent,
        BlogPostListComponent
    ],
    imports: [CommonModule],
    exports: [BlogPostListComponent]
})
export class BlogPostModule { }