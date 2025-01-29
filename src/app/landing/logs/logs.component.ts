import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wt-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  public loader: any = false;
  public agGridOptions: any = {
    "title": "Logs",
    "defaultColDef": {
      "flex": 1,
      "resizable": false,
      "sortable": true,
      "filter": true
    },
    "pagination": true,
    "columnDefs": [
      {
        "headerName": "Device",
        "field": "device_name"
      },
      {
        "headerName": "Origin",
        "field": "origin"
      },
      {
        "headerName": "User",
        "field": "user"
      },
      {
        "headerName": "Time",
        "field": "time"
      },
    ],
    "rowData": [
      {
        "device_name": "Windmill 1",
        "origin": "10.34.23.42",
        "user": "Bhanu",
        "time": "24-05-2024"
      },
      {
        "device_name": "Windmill 1",
        "origin": "10.34.23.42",
        "user": "Bhanu",
        "time": "24-05-2024"
      },
      {
        "device_name": "Windmill 1",
        "origin": "10.34.23.42",
        "user": "Bhanu",
        "time": "24-05-2024"
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
