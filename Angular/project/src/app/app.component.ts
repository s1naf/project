import { Component,inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router , Route } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from './shared/services/user.service';
import { LoginComponent } from './components/login/login.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf, LoginComponent,UserRegistrationComponent],
            
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'project';
  userService = inject(UserService)
  router = inject(Router);


}
