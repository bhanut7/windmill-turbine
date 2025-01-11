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

@NgModule({
  declarations: [
    LandingComponent,
    OrganizationComponent,
    DevicesComponent,
    DeviceDashboardComponent,
    DeviceParamComponent,
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
  ],
  exports: [
    LandingComponent,
  ]
})
export class LandingModule { }
