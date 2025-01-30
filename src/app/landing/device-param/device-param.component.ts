import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wt-device-param',
  templateUrl: './device-param.component.html',
  styleUrls: ['./device-param.component.scss']
})
export class DeviceParamComponent implements OnInit {

  public meta: any = {
    deviceName: 'Windmill 1',
    assetName: 'Bearing 1',
    assetInformation: [
      { "label": "Site", "value": "Hamburg" },
      { "label": "Location", "value": "" },
      { "label": "Line", "value": "Sector 32" },
      { "label": "Make", "value": "SKF" },
      { "label": "Equipment", "value": "Windmill" },
      { "label": "Model", "value": "2307 EKTN9" },
      { "label": "Asset", "value": "Bearing 1" },
      { "label": "Downtime cost", "value": "€ 30.000" }
    ]
  };
  public dateRange: any = [];
  public maxDate: any = new Date();
  defaultStartDate: Date = this.dateRange.start;
  defaultEndDate: Date = this.dateRange.end;

  public chartOptions: any;

  ngOnInit(): void {
    this.initializeChart();
  }

  changeDashboardRange() {
    try {

    } catch (err) {
      console.error(err);
    }
  }

  initializeChart(): void {
    this.chartOptions = {
      tooltip: {
        trigger: 'axis'
      },
      "toolbox": {
          "show": true,
          "feature": {
              // "dataView": {
              //     "readOnly": false
              // },
              "magicType": {
                  "type": [
                      "line",
                      "bar"
                  ]
              },
              "saveAsImage": {}
          }
      },
      xAxis: {
        type: 'category',
        data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Data',
          type: 'bar',
          data: [120, 200, 150, 80, 70, 110, 130],
          barWidth: '25%'
        }
      ]
    };
  }

}
