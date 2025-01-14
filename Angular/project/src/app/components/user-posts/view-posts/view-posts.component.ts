import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../shared/services/user-post.service';
import { PostForHomePage } from '../../../shared/interfaces/posts-from-backend';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-view-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-posts.component.html',
  styleUrl: './view-posts.component.css'
})
export class ViewPostsComponent  implements OnInit {


  postService = inject(PostService);
  postForView: PostForHomePage[] = [];
  // usernames: string[] = [];
  // posts: {content:string,date:string}[] = [];

  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  totalItems = 0;


  ngOnInit() {
    // this.loadPosts(this.currentPage,this.pageSize);
    // loadPosts(page:number,limit:number){
      this.postService.getPosts().subscribe({
        next: (response:{data:PostForHomePage[]}) => {
          this.postForView = response.data;
          
        },
          error: (error) => {
            console.log("Error", error);
          }
        
      });
    // }
  }
}

