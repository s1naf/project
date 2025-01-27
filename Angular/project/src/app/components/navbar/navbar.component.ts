import { Component, effect, inject, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../shared/services/user.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NavList } from '../../shared/interfaces/menu-list';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,MatIconModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userService = inject(UserService) 
  navMenu: NavList[]= []
  userSubscription: Subscription | undefined;
  route = inject(ActivatedRoute);
  

  
   
  constructor() {
    effect(() => {
      const user = this.userService.user();
      console.log("users pass from effect",user)
      if (user) {
        const username = user.username;
        this.specificNavMenu(user.role, username);
      }
    });
  }

  
  
 
  specificNavMenu(role:string,username:string){
    this.navMenu = [];
    if(role==="admin"){
      this.navMenu.push(
        {text:"Admin View",routerLink:"admin/users"},
        {text:"Admin Posts",routerLink:"admin/view"},
        {text:"My posts",routerLink:`posts/${username}`},
        {text:"Create Post",routerLink:"post/create"},
        {text:"Latest Posts",routerLink:"home"}
    )}
    else{
        this.navMenu.push(
        {text:"My posts",routerLink:`posts/${username}`},
        {text:"Create Post",routerLink:"post/create"},
        {text:"Latest Posts",routerLink:"home"},
        {text:"Profile",routerLink:`profile/${username}`}
      )}
      
  }
  



  logout(){
    this.userService.logoutUser()
  } 

  trackByNavMenu(index: number, item: { text: string, routerLink: string }): string {
    return item.routerLink; // Επιστρέφει το μοναδικό 'routerLink' του στοιχείου
  }
  
}
