import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    "columnDefs": [
      {
        "headerName": "Name",
        "field": "device_name",
        "action": {
          action: 'view',
          type: 'view',
        }
      },
      {
        "headerName": "Type",
        "field": "device_type"
      },
      {
        "headerName": "Group Name",
        "field": "device_group_name"
      }
    ],
    "rowData": [
      {
        "device_id": "device_01",
        "device_name": "Windmill 1",
        "device_type": "Edge Server",
        "device_group_name": "Device Group 1",
        "device_group_id": "device_group_1",
      },
      {
        "device_id": "device_02",
        "device_name": "Windmill 2",
        "device_type": "device",
        "device_group_name": "Device Group 2",
        "device_group_id": "device_group_2",
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
        // {
        //   "label": "Create New",
        //   "action": "addnew",
        //   "type": "addnew",
        //   "icon-class": "fa fa-plus mr-2"
        // }
      ]
    },
    "enableActions": true
  };
  public deviceForm: FormGroup = new FormGroup({
    device_name: new FormControl({ value: null, disabled: false}, [Validators.required]),
    device_type: new FormControl({ value: null, disabled: false}, [Validators.required]),
    device_group_name: new FormControl({ value: null, disabled: false}, [Validators.required])
  });
  public deviceData: any = {
    device_name: null,
    device_type: '',
    device_group_name: '',
  };
  public dropdownData: any = {
    types: [
      {
        label: 'Select Device Type',
        value: '',
      },
      {
        label: 'Edge Server',
        value: 'Edge Server',
      },
      {
        label: 'Device',
        value: 'Device',
      }
    ],
    device_groups: [
      {
        device_group_name: 'Select Device Group',
        device_group_id: '',
      },
      {
        "device_group_id": "device_group_01",
        "device_group_name": "Mosquitto",
        "environments_count": "5",
        "group_type": "Static"
      },
      {
        "device_group_id": "device_group_01",
        "device_group_name": "Mosquitto 1",
        "environments_count": "2",
        "group_type": "Static"
      },
      {
        "device_group_id": "device_group_01",
        "device_group_name": "Mosquitto 2",
        "environments_count": "3",
        "group_type": "Static"
      },
      {
        "device_group_id": "device_group_01",
        "device_group_name": "Mosquitto 3",
        "environments_count": "4",
        "group_type": "Static"
      }
    ]
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  aggridEmitter(event) {
    if (event?.action?.action === 'view') {
      this.router.navigate(['/app/devices/1/assets']);
    }
  }

  createDevice() {}

}
