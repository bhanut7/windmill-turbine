import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wt-device-groups',
  templateUrl: './device-groups.component.html',
  styleUrls: ['./device-groups.component.scss']
})
export class DeviceGroupsComponent implements OnInit {

  public loader: any = false;
  public agGridOptions: any = {
    "title": "Device Groups",
    "defaultColDef": {
      "flex": 1,
      "resizable": false,
      "sortable": true,
      "filter": true
    },
    "pagination": true,
    "columnDefs": [
      {
        "headerName": "Device Group Name",
        "field": "device_group_name"
      },
      {
        "headerName": "Environments Count",
        "field": "environments_count"
      },
      {
        "headerName": "Group Type",
        "field": "group_type"
      }
    ],
    "rowData": [
      {
        "device_group_id": "device_group_01",
        "device_group_name": "mosquitto",
        "environments_count": "5",
        "group_type": "Static"
      },
      {
        "device_group_id": "device_group_01",
        "device_group_name": "mosquitto",
        "environments_count": "2",
        "group_type": "Static"
      },
      {
        "device_group_id": "device_group_01",
        "device_group_name": "mosquitto",
        "environments_count": "3",
        "group_type": "Static"
      },
      {
        "device_group_id": "device_group_01",
        "device_group_name": "mosquitto",
        "environments_count": "4",
        "group_type": "Static"
      }
    ],
    "tableActions": {
      "actions": [
        {
          "label": "Edit",
          "action": "edit",
          "type": "edit",
          "icon-class": "edit"
        },
        {
          "label": "Edit",
          "action": "edit",
          "type": "edit",
          "icon-class": "delete"
        }
      ],
      "externalActions": [
        {
          "label": "Create New",
          "action": "addnew",
          "type": "addnew",
          "icon-class": "fa fa-plus mr-2"
        }
      ]
    },
    "enableActions": true
  }

  constructor() { }

  ngOnInit(): void {
  }

  aggridEmitter(event) {

  }

}
