import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Client, GetBlogPostsResponse } from '@api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: GetBlogPostsResponse[];

  constructor(
    private client: Client,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.client.blogPostsAll().subscribe((data: any[]) => {
      // Sanitize images for each post
      this.posts = data;
    });
  }

  sanitizeImage(image: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${image}`);
  }
}
