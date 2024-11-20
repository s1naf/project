import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UserRegistration } from './shared/interfaces/user-registration';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { BodyComponent } from './style/body/body.component';
import { FooterComponent } from './style/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserRegistrationComponent,BodyComponent,FooterComponent,RouterLink,NavbarComponent,DashboardComponent],
            
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'project';



}
