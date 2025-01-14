import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/home/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { authGuard } from './shared/guards/auth.guard';
import { authRoleGuard } from './shared/guards/auth-role.guard';
import { ViewPostsComponent } from './components/user-posts/view-posts/view-posts.component';
import { LatestPostsComponent } from './components/user-posts/latest-posts/latest-posts.component';
import { PostByUsernameComponent } from './components/user-posts/post-by-username/post-by-username.component';

export const routes: Routes = [
    {path:'register', component: UserRegistrationComponent },
    {path:'welcome', component:WelcomeComponent},
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path: 'dashboard',canActivate:[authGuard], component:DashboardComponent},
    {path: 'login', component:LoginComponent},
    {path: 'content', component:QuestionsComponent},
    {path: 'admin/view',canActivate:[authGuard,authRoleGuard], component:ViewPostsComponent},
    {path: 'home', canActivate:[authGuard], component:LatestPostsComponent},
    {path: 'posts/:username',canActivate:[authGuard] ,component:PostByUsernameComponent}
];
