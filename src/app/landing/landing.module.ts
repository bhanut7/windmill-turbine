import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { SimpleTableModule } from '../shared/simple-table/simple-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInputValidatorModule } from '../utilities/user-input-validator/user-input-validator.module';
import { AgGridModule } from 'ag-grid-angular';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDashboardComponent } from './device-dashboard/device-dashboard.component';
import { DeviceParamComponent } from './device-param/device-param.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ParametersComponent } from './hierarchy/parameters/parameters.component';
import { TagsComponent } from './devices/tags/tags.component';
import { DeviceGroupsComponent } from './devices/device-groups/device-groups.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AssetsComponent } from './site/assets/assets.component';
import { LogsComponent } from './logs/logs.component';
import { SiteComponent } from './site/site.component';
import { LineComponent } from './site/line/line.component';
import { EquipmentComponent } from './site/equipment/equipment.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { HierarchyFieldsComponent } from './hierarchy/hierarchy-fields/hierarchy-fields.component';

@NgModule({
  declarations: [
    LandingComponent,
    DevicesComponent,
    DeviceDashboardComponent,
    DeviceParamComponent,
    ParametersComponent,
    TagsComponent,
    DeviceGroupsComponent,
    AssetsComponent,
    LogsComponent,
    SiteComponent,
    LineComponent,
    EquipmentComponent,
    HierarchyComponent,
    HierarchyFieldsComponent,
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
