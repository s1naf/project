import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/mongo-backend';
import { LoggedInUser, LoginUser } from '../interfaces/login-user';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { AdminView } from '../interfaces/admin-view';


const API_URL=`${environment.apiURL}/api/users`

@Injectable({
  providedIn: 'root'
})

export class UserService {
  http:HttpClient = inject(HttpClient)
  router = inject(Router)

  user = signal<LoggedInUser | null>(null)
  

  constructor() { 
    const accessToken = localStorage.getItem("accessToken")
    if(accessToken){
      const decodedToken = jwtDecode(accessToken) as unknown as LoggedInUser;
      this.user.set({
        username:decodedToken.username,
        id:decodedToken.id,
        role:decodedToken.role,
        email:decodedToken.email
      })
       
    }
    effect(()=>{
      if(this.user()){
        console.log("User logged in",this.user()?.username)
      }else{
        console.log("No user logged in")
      }
    }
  )

  }

  registerUser(newUser:User){
    return this.http.post<{data:string}>(`${API_URL}/register`,newUser)
  }

  checkEmail(email:string){
    return this.http.get<{data:boolean}>(`${API_URL}/checkemail`,)
  }

  loginUser(loginCredentials:LoginUser){
    return this.http.post<{data:string}>(`${API_URL}/login`,loginCredentials)
  }

  checkUsername(username: string) {
    return this.http.get<{ data: boolean }>(`${API_URL}/checkusername`, );
  }

  updateUser(id: string, updateData: any) {
    return this.http.patch<{ data: User }>(`${API_URL}/update/credentials`, { id, ...updateData });
  }
  findOne() {
    const username = this.user()?.username;
    return this.http.get<{ data: User }>(`${API_URL}/${username}`);
  }

  getUsers(){
    return this.http.get<{data:AdminView[]}>(`${API_URL}/admin/view`)
  }
  editRole(username:string,role:string){
    return this.http.patch<{data:User}>(`${API_URL}/admin/edit/role`,{username,role})
  }

  deleteUser(username:string){
    return this.http.delete<{data:User}>(`${API_URL}/admin/delete/${username}`)
  }

  logoutUser(){
    this.user.set(null);
    localStorage.removeItem('accessToken');
    this.router.navigate(['login']);
    const logout = true;
}
}


