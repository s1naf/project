import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/mongo-backend';


// http://localhost:3000/api/users/register
const API_URL=`${environment.apiURL}/api/users`

@Injectable({
  providedIn: 'root'
})

export class UserService {
  http:HttpClient = inject(HttpClient)

  registerUser(user:User){
    return this.http.post<{msg:string}>(`${API_URL}/register`,user)
  }
}


