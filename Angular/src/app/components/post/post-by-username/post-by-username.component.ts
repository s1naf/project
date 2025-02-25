import { Component,effect,inject } from '@angular/core';
import { PostService } from '../../../shared/services/user-post.service';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';//importing ActivatedRoute to get the username from the URL
import { UserPost } from '../../../shared/interfaces/post-interface';
import { CommonModule } from '@angular/common';
import { FormGroup,FormControl,ReactiveFormsModule,Validators } from '@angular/forms';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator'; 
@Component({
  selector: 'app-post-by-username',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './post-by-username.component.html',
  styleUrl: './post-by-username.component.css'
})
export class PostByUsernameComponent  {

  postService = inject(PostService);
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  postsByUsername: UserPost[] = [];
  isCurrentUser:boolean = false;
  

  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  totalItems = 0;
  username = '';
  

  updatePostForm = new FormGroup({
    content: new FormControl('',Validators.required)
  });


  ngOnInit(){
      this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
      this.checkCurrentUser();
      this.loadPosts(this.currentPage, this.pageSize);
    });
  }
  

  checkCurrentUser(): void {
    const user = this.userService.user();
    if (user?.username === this.username) {
      this.isCurrentUser = true;
    } else {
      this.isCurrentUser = false;
    }
  }


  loadPosts(page: number, limit: number) {
    this.postService.getPostsByUsername(this.username,page,limit).subscribe({
      next: (response: { data: UserPost[],totalItems:number,totalPages:number }) => {
        console.log("Success", response);
        this.postsByUsername = response.data;
        console.log(this.postsByUsername);
        this.totalPages = response.totalPages;
        this.currentPage = page;
        this.totalItems = response.totalItems;
      },
      error: (error) => {
        console.log("Error", error);
      }
    });
  }

  updatePost(postId:string){

    if (this.updatePostForm.invalid) {
      return;
    }

    const contentToBeUpdate = this.updatePostForm.controls.content.value!;
    
    this.postService.updatePost(postId,contentToBeUpdate).subscribe({
      next: (response) => {
        console.log("success", response);
        this.updatePostForm.reset();
        this.postsByUsername = this.postsByUsername.map(user => {
          user.posts = user.posts.map(post => {
            if (post._id === postId){
              post.content = contentToBeUpdate;
            }
            return post;
          });
          return user;
        });
      },
      error: (error) => {
        console.log("error", error);
      }
    });
  }


  deletePost(_id:string){
    this.postService.deletePost(_id).subscribe({
      next: (response) => {
        console.log("success", response);
        this.postsByUsername = this.postsByUsername.map(user => {
          user.posts = user.posts.filter(post => post._id !== _id);
          return user;})       
      },
      error: (error) => {
        console.log("error", error);
      }
  });
}

onPageChange(event: PageEvent) {
  this.loadPosts(event.pageIndex + 1, event.pageSize);
}

formatDate(date: string) {
  return new Date(date).toDateString();
}
}
