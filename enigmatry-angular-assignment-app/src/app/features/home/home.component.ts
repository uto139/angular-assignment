import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogPostsClient, GetBlogPostsResponse } from '@api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: GetBlogPostsResponse[];

  constructor(
    private client: BlogPostsClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.client.getAll().subscribe((data: any[]) => {
      this.posts = data;
    });
  }

  //TODO
  sanitizeImage(image: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${image}`);
  }
}
