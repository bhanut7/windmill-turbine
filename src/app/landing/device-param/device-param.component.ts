import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { ToasterService } from 'src/app/shared/toastr/toaster.service';

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

  public chartOptions1: any;
  public chartOptions2: any;
  public chartOptions3: any;
  public chartOptions4: any;
  public titles: any = {
    chart1: null,
    chart2: null,
    chart3: null,
    chart4: null,
  }
  public loader: any = {
    chart1: false,
    chart2: false,
    chart3: false,
    chart4: false,
  }
  public destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private appservice: AppService, private toaster: ToasterService) {

  }

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
    this.loadData(1);
    this.loadData(2);
    this.loadData(3);
    this.loadData(4);
  }


    loadData(chartno: any) {
        try {
          this.loader['chart'+chartno] = true;
          this.appservice.getDeviceParamChartData({chNo: chartno}).pipe(takeUntil(this.destroy$)).subscribe(respData => {
            if (respData && respData['status'] === 'success') {
              this.titles['chart'+chartno] = respData?.title || 'Chart Visualization';
              let tempChartOpt: any = respData?.data || {};
              if (tempChartOpt?.xAxis?.axisLabel?.formatter) {
                tempChartOpt.xAxis.axisLabel.formatter = eval(tempChartOpt.xAxis.axisLabel.formatter);
              }
              if (tempChartOpt?.yAxis?.axisLabel?.formatter) {
                tempChartOpt.yAxis.axisLabel.formatter = eval(tempChartOpt.yAxis.axisLabel.formatter);
              }
              for (let i = 0; i < tempChartOpt?.series?.length; i++) {
                let eachData = tempChartOpt?.series[i]
                if (eachData?.data?.length) {
                  eachData.data = respData.data.series[i].data.map((y, index) => [(index / (respData?.data.series[i].data.length/10)), y])
                }
              }
              this['chartOptions'+chartno] = tempChartOpt;
              this.loader['chart'+chartno] = false;
            } else {
              this.loader['chart'+chartno] = false;
              this.toaster.toast('error', 'Error', respData['message'] || 'Error while fetching data.');
            }
          }, (error) => {
            this.loader['chart'+chartno] = false;
            this.toaster.toast('error', 'Error', 'Error while fetching data.');
            console.error(error);
          });
        } catch (table_error) {
          this.loader['chart'+chartno] = false;
          console.error(table_error)
        }
      }

      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }

}
