import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Client, Response } from '@api';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {
  post: Response;

  constructor(
    private client: Client,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.client.blogPostsAll().subscribe((data: any[]) => {
      this.post = {
        ...data[0],
        mainImage: this.sanitizeImage(data[0].mainImage),
        attachmentImages: data[0].attachmentImages.map((image: string) =>
          this.sanitizeImage(image)
        )
      };
    });
  }

  sanitizeImage(image: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${image}`);
  }
}