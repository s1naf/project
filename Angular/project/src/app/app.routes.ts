import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionsComponent } from './components/posts/create-post.component';
import { authGuard } from './shared/guards/auth.guard';
import { authRoleGuard } from './shared/guards/auth-role.guard';
import { ViewPostsComponent } from './components/admin/view-posts/view-posts.component';
import { LatestPostsComponent } from './components/user-posts/latest-posts/latest-posts.component';
import { PostByUsernameComponent } from './components/user-posts/post-by-username/post-by-username.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UsersViewComponent } from './components/admin/users-view/users-view.component';


export const routes: Routes = [
    {path:'register', component: UserRegistrationComponent },
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path: 'login', component:LoginComponent},
    {path: 'post/create',canActivate:[authGuard], component:QuestionsComponent},
    {path: 'admin/view',canActivate:[authGuard,authRoleGuard], component:ViewPostsComponent},
    {path: 'home', canActivate:[authGuard], component:LatestPostsComponent},
    {path: 'posts/:username',canActivate:[authGuard] ,component:PostByUsernameComponent},
    {path: 'profile/:username', canActivate: [authGuard], component: UserUpdateComponent},
    {path: 'admin/users', canActivate: [authGuard, authRoleGuard],component:UsersViewComponent}
];
