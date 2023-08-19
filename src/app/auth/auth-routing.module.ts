import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { hasUserGuard } from '../core/guards/hasUser';
import { isGuestGuard } from '../core/guards/isGuest';

const routes: Routes = [

  { path: 'login', component: LoginComponent, canActivate: [isGuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [isGuestGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [hasUserGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [hasUserGuard] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuthRoutingModule {}