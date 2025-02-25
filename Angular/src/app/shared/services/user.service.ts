import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User, UserView } from '../interfaces/user-interface';
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
  newRoleString: string = ' ';
  newRole : boolean = false;

    

  constructor() { 
    
    const accessToken = localStorage.getItem("accessToken")
      if(accessToken){
        const decodedToken = jwtDecode(accessToken) as unknown as LoggedInUser;
        const mappedUsername = localStorage.getItem("username");
        
        if(this.newRole){
          const mappedRole = this.newRoleString;
          console.log("Mapped role",mappedRole)
          this.user.set({
            username: mappedUsername || decodedToken.username,
            id:decodedToken.id,
            role: mappedRole,
            email:decodedToken.email,
          })
        }else{
          this.user.set({
            username: mappedUsername || decodedToken.username,
            id:decodedToken.id,
            role: decodedToken.role,
            email:decodedToken.email,
          })
        }
    }
    
    effect(()=>{ 
      if (this.user()){
        console.log("User logged in: ", this.user()?.username);          
    } else {
        console.log('No user logged in');
    }
    }
  )
  }

  registerUser(newUser:User){
    return this.http.post<{data:User}>(`${API_URL}/register`,newUser)
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
    return this.http.patch<{ data: UserView }>(`${API_URL}/update/credentials`, { id, ...updateData });
  }
  findOne() {
    const username = this.user()?.username;
    return this.http.get<{ data: User }>(`${API_URL}/${username}`);
  }

  getUsers(){
    return this.http.get<{data:AdminView[]}>(`${API_URL}/admin/view`)
  }
  editRole(username:string,role:string){
    return this.http.patch<{data:AdminView}>(`${API_URL}/admin/edit/role`,{username,role})
  }

  deleteUser(username:string){
    return this.http.delete<{data:AdminView}>(`${API_URL}/admin/delete/${username}`)
  }


  logoutUser(){
    this.user.set(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    this.router.navigate(['login']);
    const logout = true;
}

updateUsername(newUsername: string) {
  localStorage.setItem('username', newUsername);
  const user = this.user();
  if (user) {
    this.user.set({
      ...user,
      username: newUsername
    });
  }
}

updateRole(newRole: string) {
  this.newRole = true;
  this.newRoleString = newRole;
  const user = this.user();
  if (user) {
    this.user.set({
      ...user,
      role: newRole
    });
  }
}

}


