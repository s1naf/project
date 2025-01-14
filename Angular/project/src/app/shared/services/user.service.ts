import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/mongo-backend';
import { LoggedInUser, LoginUser } from '../interfaces/login-user';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
// http://localhost:3000/api/users/register
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
        role:decodedToken.role
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

  // checkEmail(email:string){
  //   return this.http.get<{data:string}>(`${API_URL}/checkemail/${email}`)
  // }

  loginUser(loginCredentials:LoginUser){
    return this.http.post<{data:string}>(`${API_URL}/login`,loginCredentials)
  }

  
  logoutUser(){
    this.user.set(null);
    localStorage.removeItem('accessToken');
    this.router.navigate(['login']);
}
}


