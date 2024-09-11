import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Client, Response } from '@api';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  posts: Response[] = [];

  constructor(
    private client: Client,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.client.blogPostsAll().subscribe((data: any[]) => {
      // Sanitize images for each post
      this.posts = data.map(post => ({
        ...post,
        mainImage: this.sanitizeImage(post.mainImage)
      }));
    });
  }

  sanitizeImage(image: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${image}`);
  }
}
