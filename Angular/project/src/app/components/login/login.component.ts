import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { LoggedInUser, LoginUser } from '../../shared/interfaces/login-user';
import { RouterLink } from '@angular/router';
import {jwtDecode} from 'jwt-decode'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    userService = inject(UserService)
    router = inject(Router)

    invalidLogin = false;
  
    form = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })

  onSubmit(){
    if(this.form.valid){
      const loginCredentials = this.form.value as LoginUser;
      
      console.log("Waiting for response")
      
      this.userService.loginUser(loginCredentials).subscribe({
        next:(response) =>{
          const accessToken = response.data;
          console.log("Received token:", accessToken);

          localStorage.setItem("accessToken",accessToken)
          console.log("Token stored in localStorage");

          console.log("success",response) 
          
          const decodedToken = jwtDecode(accessToken) as unknown as LoggedInUser;
          console.log("Decoded token",decodedToken)
          
          

            this.userService.user.set({
              username:decodedToken.username,
              id:decodedToken.id,
              role:decodedToken.role

            })
            
          console.log("User logged in",decodedToken.username)
          console.log("User id",decodedToken.id)
          console.log("User role",decodedToken.role)

          this.router.navigate(['/home'])
        },
        error:(error) =>{
          console.log("loggin error",error)
          this.invalidLogin = true;

        }
      })
    }
  }
}
