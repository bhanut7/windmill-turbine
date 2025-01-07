import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LandingComponent } from './landing.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent, children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./main-dashboard/main-dashboard.module').then(m => m.MainDashboardModule),
      },
      { path: 'organization', component: OrganizationComponent, canActivate: [AuthGuard] },
      // {
      //   path: 'projects',
      //   loadChildren: () => import('./project-management/project-management.module').then(m => m.ProjectManagementModule),
      //   data: { page: 'project_info' },
      //   canActivate: [AuthGuard]
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
