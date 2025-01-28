import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTablesComponent} from './user-tables/user-tables.component';
import { ConfigUserComponent} from './config-user/config-user.component';
import { ConfigUserRoleComponent} from './config-user-role/config-user-role.component';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
  {
    path: '', component: UserManagementComponent, children: [
      { path: '', redirectTo: 'user-table/users', pathMatch: 'full' },
      { path: 'user-table/:type', component: UserTablesComponent }, // users, user-roles
      { path: 'config-user/new', component: ConfigUserComponent },
      { path: 'config-user-role/new', component: ConfigUserRoleComponent },
      { path: 'config-user/:mode/:id', component: ConfigUserComponent }, // mode - edit, view
      { path: 'config-user-role/:mode/:id', component: ConfigUserRoleComponent }, 
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
