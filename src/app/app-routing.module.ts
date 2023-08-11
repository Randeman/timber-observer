import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { ObserverComponent } from './observer/observer.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/report"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "report",
    component: ReportComponent
  },
  {
    path: "observer",
    component: ObserverComponent
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  // {
  //   path: "**",
  //   component: NotFoundComponent
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
