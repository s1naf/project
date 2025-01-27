import { CanActivateFn,Router } from '@angular/router';
import {inject} from '@angular/core';
import { UserService } from '../services/user.service';
import { jwtDecode } from 'jwt-decode';





export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const token = localStorage.getItem("accessToken");
  // const expiresIn = localStorage.getItem("accessToken.expiresIn") as unknown as number;

  
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        document.cookie = `accessToken=${token};path=/;SameSite=Lax;Secure;`;

        return true;
      }else{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        document.cookie = 'accessToken=;Max-Age=0;path=/;SameSite=Lax;Secure';
        return router.navigate(['login']);
      }
  }
  else {
    return router.navigate(['login']);
  }
}
  
// document.cookie = `accessToken=${accessToken};path=/;SameSite=Lax;Secure;Max-Age=3600`;



  // if (userService.user()) {
  //   return true;
  // }else{
  // return router.navigate(['login']);
  // }

