import { Component,inject } from '@angular/core';
import { PostService } from '../../../shared/services/user-post.service';
import { PostForHomePage } from '../../../shared/interfaces/posts-from-backend';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './latest-posts.component.html',
  styleUrl: './latest-posts.component.css'
})
export class LatestPostsComponent {

  postService = inject(PostService);
  latestPosts:PostForHomePage[] = [];
  
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  totalItems = 0;


  ngOnInit() {
    this.postService.getLatestPosts().subscribe({
      next: (response:{data:PostForHomePage[]}) => {
        this.latestPosts = response.data;
        console.log("Received posts", response);
        
      },
      error: (error) => {
        console.log("Error", error);
      }
    });
  }


}
