import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../shared/services/user-post.service';
import { PostForHomePage } from '../../../shared/interfaces/posts-from-backend';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-view-posts',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {

  postService = inject(PostService);
  postForView: PostForHomePage[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  totalItems = 0;

  ngOnInit() {
    this.loadPosts(this.currentPage, this.pageSize);
  }

  loadPosts(page: number, limit: number) {
    this.postService.getPosts(page, limit).subscribe({
      next: (response: { data: PostForHomePage[], totalItems: number, totalPages: number }) => {
        this.postForView = response.data;
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

  deletePost(_id: string, username: string) {
    this.postService.adminDelete(_id,username).subscribe({
      next: (response) => {
        console.log("success", response);
        this.postForView = this.postForView.filter(post => post._id !== _id);
      },
      error: (error) => {
        console.log("error", error);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.loadPosts(event.pageIndex + 1, event.pageSize);
  }
}