import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LandingComponent } from './landing.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDashboardComponent } from './device-dashboard/device-dashboard.component';
import { DeviceParamComponent } from './device-param/device-param.component';
import { TagsComponent } from './devices/tags/tags.component';
import { ParametersComponent } from './hierarchy/parameters/parameters.component';
import { DeviceGroupsComponent } from './devices/device-groups/device-groups.component';
import { AssetsComponent } from './site/assets/assets.component';
import { LogsComponent } from './logs/logs.component';
import { SiteComponent } from './site/site.component';
import { LineComponent } from './site/line/line.component';
import { EquipmentComponent } from './site/equipment/equipment.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent, children: [
      { path: '', redirectTo: '', pathMatch: 'full' },

      { path: 'hierarchy', component: HierarchyComponent, canActivate: [AuthGuard] },
      { path: 'hierarchy/:level/:id', component: HierarchyComponent, canActivate: [AuthGuard] },
      { path: 'sites', component: SiteComponent, canActivate: [AuthGuard] },
      { path: 'lines', component: LineComponent, canActivate: [AuthGuard] },
      { path: 'equipments', component: EquipmentComponent, canActivate: [AuthGuard] },
      { path: 'assets', component: AssetsComponent, canActivate: [AuthGuard] },

      { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
      // { path: 'devices/:id/assets', component: AssetsComponent, canActivate: [AuthGuard] },
      { path: 'device-groups', component: DeviceGroupsComponent, canActivate: [AuthGuard] },
      { path: 'tags', component: TagsComponent, canActivate: [AuthGuard] },
      { path: 'parameters', component: ParametersComponent, canActivate: [AuthGuard] },
      { path: 'asset-dashboard', component: DeviceDashboardComponent, canActivate: [AuthGuard] },
      { path: 'asset-dashboard/:id', component: DeviceDashboardComponent, canActivate: [AuthGuard] },
      { path: 'asset-dashboard/:id/:parameterId', component: DeviceParamComponent, canActivate: [AuthGuard] },
      { path: 'devices/:id/assets/:assetId', component: DeviceDashboardComponent, canActivate: [AuthGuard] }, // not using
      { path: 'devices/:id/assets/:assetId/:param', component: DeviceParamComponent, canActivate: [AuthGuard] }, // not using
      { path: 'logs', component: LogsComponent, canActivate: [AuthGuard] },
      {
        path: '',
        loadChildren: () => import('./main-dashboard/main-dashboard.module').then(m => m.MainDashboardModule),
      },
      {
        path: 'user-mt',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
      }
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
