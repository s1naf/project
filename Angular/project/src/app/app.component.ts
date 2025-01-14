import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { BodyComponent } from './style/body/body.component';
import { FooterComponent } from './style/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewPostsComponent } from './components/user-posts/view-posts/view-posts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
            
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'project';



}
