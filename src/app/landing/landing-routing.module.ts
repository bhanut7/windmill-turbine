import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LandingComponent } from './landing.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDashboardComponent } from './device-dashboard/device-dashboard.component';
import { DeviceParamComponent } from './device-param/device-param.component';
import { TagsComponent } from './tags/tags.component';
import { ParametersComponent } from './parameters/parameters.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent, children: [
      { path: '', redirectTo: 'devices', pathMatch: 'full' },
      { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
      { path: 'tags', component: TagsComponent, canActivate: [AuthGuard] },
      { path: 'parameters', component: ParametersComponent, canActivate: [AuthGuard] },
      { path: 'devices/:id', component: DeviceDashboardComponent, canActivate: [AuthGuard] },
      { path: 'devices/:id/:param', component: DeviceParamComponent, canActivate: [AuthGuard] },
      {
        path: '',
        loadChildren: () => import('./main-dashboard/main-dashboard.module').then(m => m.MainDashboardModule),
      },
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
