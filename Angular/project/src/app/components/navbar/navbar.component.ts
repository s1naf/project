import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../shared/services/user.service';
import { RouterLink } from '@angular/router';
import { NavList } from '../../shared/interfaces/menu-list';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navMenu: NavList[]= [
    {text:"Register",routerLink:"register"},
    {text:"Dashboard",routerLink:"dashboard"},
    {text:"Login",routerLink:"login"},
    {text:"Content",routerLink:"content"},
    

  ]

  userService = inject(UserService) 
  user = this.userService.user

  logout(){
    this.userService.logoutUser()
  } 
  
}
