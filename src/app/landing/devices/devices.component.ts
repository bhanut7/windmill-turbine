import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  public loader: any = false;
  public agGridOptions: any = {
    "title": "Devices",
    "defaultColDef": {
      "flex": 1,
      "resizable": false,
      "sortable": true,
      "filter": true
    },
    "pagination": true,
    "clickableColumns": ["device_name"],
    "columnDefs": [
      {
        "headerName": "Device Name",
        "field": "device_name",
        "action": {
          action: 'view',
          type: 'view',
        }
      },
      {
        "headerName": "Device Count",
        "field": "environments_count"
      },
      {
        "headerName": "Group Type",
        "field": "group_type"
      }
    ],
    "rowData": [
      {
        "device_id": "device_01",
        "device_name": "Windmill 1",
        "environments_count": "5",
        "group_type": "Static"
      },
      {
        "device_id": "device_02",
        "device_name": "Windmill 2",
        "environments_count": "5",
        "group_type": "Static"
      },
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
          "label": "Delete",
          "action": "delete",
          "type": "delete",
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  aggridEmitter(event) {
    if (event?.action?.action === 'view') {
      this.router.navigate(['/app/devices/1/assets']);
    }
  }

}
