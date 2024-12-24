import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavList } from '../../shared/interfaces/menu-list';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navMenu: NavList[]= [
    {text:"Home",routerLink:""},
    {text:"Register",routerLink:"register"},
    {text:"Dashboard",routerLink:"dashboard"}

  ]
}
