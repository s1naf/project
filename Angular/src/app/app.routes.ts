import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { LoginComponent } from './components/login/login.component';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { authGuard } from './components/guards/auth.guard';
import { authRoleGuard } from './components/guards/auth-role.guard';
import { ViewPostsComponent } from './components/admin/post-admin/view-posts.component';
import { LatestPostsComponent } from './components/post/latest-posts/latest-posts.component';
import { PostByUsernameComponent } from './components/post/post-by-username/post-by-username.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UsersViewComponent } from './components/admin/user-admin/users-view.component';


export const routes: Routes = [
    {path:'register', component: UserRegistrationComponent },
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path: 'login', component:LoginComponent},
    {path: 'post/create',canActivate:[authGuard], component:CreatePostComponent},
    {path: 'admin/view',canActivate:[authGuard,authRoleGuard], component:ViewPostsComponent},
    {path: 'home', canActivate:[authGuard], component:LatestPostsComponent},
    {path: 'posts/:username',canActivate:[authGuard] ,component:PostByUsernameComponent},
    {path: 'profile/:username', canActivate: [authGuard], component: UserUpdateComponent},
    {path: 'admin/users', canActivate: [authGuard, authRoleGuard],component:UsersViewComponent}
];
