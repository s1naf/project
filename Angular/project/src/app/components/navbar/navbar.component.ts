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
  userService = inject(UserService) 
  user = this.userService.user

  navMenu: NavList[]= []
  ngOnInit(){
    this.specificNavMenu()
  }

  specificNavMenu(){
    if(this.user()?.role==="admin"){
      this.navMenu.push(
        {text:"Admin View",routerLink:"admin/users"},
        {text:"Admin Posts",routerLink:"admin/view"},
        {text:"My posts",routerLink:`posts/${this.user()?.username}`},
        {text:"Create Post",routerLink:"post/create"},
        {text:"Latest Posts",routerLink:"home"}
    )}
    else{
        this.navMenu.push(
        {text:"My posts",routerLink:`posts/${this.user()?.username}`},
        {text:"Create Post",routerLink:"post/create"},
        {text:"Latest Posts",routerLink:"home"},
        {text:"Profile",routerLink:`profile/${this.user()?.username}`}

      
      
      )}
      
  }
  



  logout(){
    this.userService.logoutUser()
  } 
  
}
