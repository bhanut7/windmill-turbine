import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserTablesComponent } from './user-tables/user-tables.component';
import { ConfigUserComponent } from './config-user/config-user.component';
import { ConfigUserRoleComponent } from './config-user-role/config-user-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { GlobalSliderModule } from '../../utilities/global-slider/global-slider.module';
import { NoWhiteSpaceValidatorModule } from '../../utilities/no-white-space-validator/no-white-space-validator.module';


@NgModule({
  declarations: [
    UserManagementComponent,
    UserTablesComponent,
    ConfigUserComponent,
    ConfigUserRoleComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    GlobalSliderModule,
    NgSelectModule,
    NoWhiteSpaceValidatorModule,
  ], 
  exports: [UserTablesComponent]
})
export class UserManagementModule { }
