import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';



export const authRoleGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.user()?.role == 'admin') {
    return true;
  }
  return router.navigate(['home']);
};
