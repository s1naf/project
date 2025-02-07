import { CanActivateFn,Router } from '@angular/router';
import {inject} from '@angular/core';
import { UserService } from '../services/user.service';
import { jwtDecode } from 'jwt-decode';





export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const token = localStorage.getItem("accessToken");

  
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return true;

      }else{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        return router.navigate(['login']);
      }
  }
  else {
    return router.navigate(['login']);
  }
}
  



