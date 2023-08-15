import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { EditReportComponent } from './edit-report/edit-report.component';

const routes: Routes = [

  {
    path: "report",
    children: [
      {
        path: "create",
        component: ReportComponent
      },
      {
        path: ":reportId",
        component: EditReportComponent
      }

    ]
  }


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ReportRoutingModule { }