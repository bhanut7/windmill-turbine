import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wt-device-param',
  templateUrl: './device-param.component.html',
  styleUrls: ['./device-param.component.scss']
})
export class DeviceParamComponent implements OnInit {

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
