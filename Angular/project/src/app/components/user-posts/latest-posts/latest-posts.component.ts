import { Component,inject } from '@angular/core';
import { PostService } from '../../../shared/services/user-post.service';
import { PostForHomePage } from '../../../shared/interfaces/posts-from-backend';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../../shared/services/user.service';



@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [CommonModule,MatPaginator,RouterLink],
  templateUrl: './latest-posts.component.html',
  styleUrl: './latest-posts.component.css'
})
export class LatestPostsComponent {

  
  postService = inject(PostService);
  latestPosts:PostForHomePage[] = [];
  userService = inject(UserService);
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  totalItems = 0;


  ngOnInit() {
    this.loadPosts(this.currentPage,this.pageSize);  
  }
  
  loadPosts(page:number,limit:number){
  this.postService.getLatestPosts(page,limit).subscribe({
    next: (response:{data:PostForHomePage[], totalItems:number, totalPages:number}) => {
      this.latestPosts = response.data;
      this.totalPages = response.totalPages;
      this.currentPage = page;
      this.totalItems = response.totalItems;
      console.log("Received posts", response);
      
    },
    error: (error) => {
      console.log("Error", error);
    }
  });
}

onPageChange(event: PageEvent) {
  this.loadPosts(event.pageIndex + 1, event.pageSize);
}

}
