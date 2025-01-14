import { inject, Injectable,signal,effect, ɵLocaleDataIndex } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Post } from '../interfaces/post';
import {jwtDecode} from 'jwt-decode';
import { LoggedInUser } from '../interfaces/login-user';
import { UserService } from './user.service';
import { Observable } from 'rxjs';


const API_URL=`${environment.apiURL}/api/posts`

@Injectable({
  providedIn: 'root'
})

export class PostService {
  http:HttpClient = inject(HttpClient)
  userService:UserService = inject(UserService)

  // usersPosts = signal<PostsFromBackend[] | null>(null)


  // loadPosts() {
  //   this.getLatestPosts().subscribe({
  //     next: (postsForView) => {
        
  //       if (postsForView && postsForView.data) {
  //         this.usersPosts.set({
  //           username:
  //         })
  //       }
  //     },
  //     error: (error) => {
  //       console.error("Error loading posts", error);
  //     }
  //   });
      
    
  // }

  // constructor(){
    // const postsForView = this.getLatestPosts() as unknown as PostsFromBackend;
    // if(postsForView){
    //   this.usersPosts.set({
    //     username:postsForView.username,
    //     posts:postsForView.posts
    //   })
    // }


    // effect(()=>{
    //   if(this.usersPosts()){
    //     console.log("Refresh Posts action",this.usersPosts())
    //   }else{
    //     console.log("No posts yet!")
    //   }
    // })
  //   this.loadPosts();

  //   effect(() => {
  //     if (this.usersPosts()) {
  //       console.log("Refresh Posts action", this.usersPosts());
  //     } else {
  //       console.log("No posts yet!");
  //     }
  //   });
  // }


  

  registerPost(post:Post){
    const username = this.userService.user()?.username
    console.log("Register post for user with username: ",username)
    return this.http.post<{data:string}>(`${API_URL}/${username}/insert`,post)
  }
  getPosts(page: number = 1, limit: number = 10){
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<{data:[]}>(`${API_URL}/`,{params})     
  }

  
  getLatestPosts(page: number = 1, limit: number = 10) {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<{data:[]}>(`${API_URL}/latest`,{params})
  }

  getPostsByUsername(username:string,page: number = 1, limit: number = 10){
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<{data:[],totalItems:number,totalPages:number}>(`${API_URL}/${username}`, {params})
  }

  updatePost(_id:string,post:string){
    const username = this.userService.user()?.username
    return this.http.patch<{data:string}>(`${API_URL}/update/${username}`,{_id,post})
  }

  deletePost(_id:string){
    const username = this.userService.user()?.username
    return this.http.delete<{data:string}>(`${API_URL}/delete/${username}`,{body:{_id}})
  }
  
}


