import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizationComponent } from './organization/organization.component';
import { SimpleTableModule } from '../shared/simple-table/simple-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInputValidatorModule } from '../utilities/user-input-validator/user-input-validator.module';
import { AgGridModule } from 'ag-grid-angular';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDashboardComponent } from './device-dashboard/device-dashboard.component';
import { DeviceParamComponent } from './device-param/device-param.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ParametersComponent } from './parameters/parameters.component';
import { TagsComponent } from './tags/tags.component';
import { DeviceGroupsComponent } from './device-groups/device-groups.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AssetsComponent } from './assets/assets.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  declarations: [
    LandingComponent,
    OrganizationComponent,
    DevicesComponent,
    DeviceDashboardComponent,
    DeviceParamComponent,
    ParametersComponent,
    TagsComponent,
    DeviceGroupsComponent,
    AssetsComponent,
    LogsComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    SimpleTableModule,
    FormsModule,
    ReactiveFormsModule,
    UserInputValidatorModule,
    AgGridModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule
  ],
  exports: [
    LandingComponent,
  ]
})
export class LandingModule { }
