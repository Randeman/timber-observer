import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ObserverComponent } from './observer/observer.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { hasUserGuard } from './core/guards/hasUser';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "observer",
    component: ObserverComponent
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "reports",
    loadChildren: () => import("./report/report.module").then(m => m.ReportModule),
    canActivate: [hasUserGuard]
  },
  {
    path: "**",
    redirectTo: "/404"
  },
  {
    path: "404",
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
