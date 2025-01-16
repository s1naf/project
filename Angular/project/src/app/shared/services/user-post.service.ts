import { inject, Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Post } from '../interfaces/post';
import { UserService } from './user.service';
import { PostForHomePage } from '../interfaces/posts-from-backend';


const API_URL=`${environment.apiURL}/api/posts`

@Injectable({
  providedIn: 'root'
})

export class PostService {
  http:HttpClient = inject(HttpClient)
  userService:UserService = inject(UserService)
  

  registerPost(post:Post){
    const username = this.userService.user()?.username
    console.log("Register post for user with username: ",username)
    return this.http.post<{data:string}>(`${API_URL}/${username}/insert`,post)
  }
  getPosts(page: number = 1, limit: number = 10){
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<{data:PostForHomePage[],totalItems:number,totalPages:number}>(`${API_URL}/`,{params})     
  }

  
  getLatestPosts(page: number = 1, limit: number = 10) {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<{data:PostForHomePage[],totalItems:number,totalPages:number}>(`${API_URL}/latest`,{params})
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


