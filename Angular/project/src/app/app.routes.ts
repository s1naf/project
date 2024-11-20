import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/home/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


export const routes: Routes = [
    {path:'register', component: UserRegistrationComponent },
    {path:'', component:WelcomeComponent},
    {path: 'dashboard', component:DashboardComponent}
    
];
