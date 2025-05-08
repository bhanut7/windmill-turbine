import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  };
  public assetInformation: any =  {
    title: 'Asset Information',
    data: []
  }
  public dateRange: any = [];
  public maxDate: any = new Date();
  defaultStartDate: Date = this.dateRange.start;
  defaultEndDate: Date = this.dateRange.end;

  public chartOptions1: any;
  public chartOptions2: any;
  public chartOptions3: any;
  public chartOptions4: any;
  public chartData: any = {
    kurtosis: {
            "tooltip": {
              "trigger": "axis"
            },
            "toolbox": {
                "show": true,
                "feature": {
                    "magicType": {
                        "type": [
                            "bar",
                            "line"
                        ]
                    },
                    "saveAsImage": {}
                }
            },
            "xAxis": {
              "type": "category",
              "name": "AssetS",
              "data": ["Bearing 1", "Bearing 2"],
              "axisLine": {
                "onZero": false
              }
            },
          "yAxis": {
            "type": "value",
            "name": "Kurtosis",
            "axisLine": {
              "show": true,
            }
        },
            "dataZoom": [{
                "type": "inside"
              }],
            "series": [
              {
                "name": "Data",
                "type": "bar",
                "showSymbol": false,
                "data": [
                  {
                    "value": 0.26,
                    "itemStyle": { "color": "#28a745" }  // Green
                  },
                  {
                    "value": -0.17,
                    "itemStyle": { "color": "#dc3545" }  // Red
                  }
                ]
              }
            ]
            
    },
    standardDeviation: {
      "tooltip": {
        "trigger": "axis"
      },
      "toolbox": {
          "show": true,
          "feature": {
              "magicType": {
                  "type": [
                      "bar",
                      "line"
                  ]
              },
              "saveAsImage": {}
          }
      },
      "xAxis": {
        "type": "category",
        "name": "AssetS",
        "data": ["Bearing 1", "Bearing 2"],
        "axisLine": {
          "onZero": false
        }
      },
    "yAxis": {
      "type": "value",
      "name": "SD",
      "axisLine": {
        "show": true,
      }
  },
      "dataZoom": [{
          "type": "inside"
        }],
      "series": [
        {
          "name": "Data",
          "type": "bar",
          "showSymbol": false,
          "data": [
            {
              "value": 2638.32,
              "itemStyle": { "color": "#28a745" }  // Green
            },
            {
              "value": 1612.64,
              "itemStyle": { "color": "#dc3545" }  // Red
            }
          ]
        }
      ]     
}
  };
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
  public paramterId: any = '';
  public hierarchyId: any = '';
  
  constructor(private appservice: AppService, private toaster: ToasterService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      if (params) {
        this.hierarchyId = params.id || '';
        this.paramterId = params.parameterId || '';
        this.fetchAllData();
      }
    });
  }

  ngOnInit(): void {
  }

  changeDashboardRange() {
    try {

    } catch (err) {
      console.error(err);
    }
  }

  initializeChart(): void {
    // this.loadData(1);
    this.loadData(2);
    // this.loadData(3);
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
                let eachData = tempChartOpt?.series[i];
                console.log(this.getKurtosis(eachData?.data), "Kurtosis");
                console.log(this.getStandardDeviation(eachData?.data), "StandardDeviation");
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

      getStandardDeviation(arr: number[]): number {
        const n = arr.length;
        if (n === 0) throw new Error("Array must contain at least one number.");
      
        const mean = arr.reduce((a, b) => a + b, 0) / n;
        const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
      
        return Math.sqrt(variance);
      }

      getKurtosis(arr: number[]): number | undefined {
        const n = arr.length;
        if (n < 4) return undefined; // Not enough data for reliable kurtosis
      
        const mean = arr.reduce((a, b) => a + b, 0) / n;
        const stdDev = this.getStandardDeviation(arr);
        if (stdDev === 0) return undefined; // Avoid division by zero
      
        const fourthMoment = arr.reduce((sum, val) => sum + Math.pow(val - mean, 4), 0) / n;
        const kurtosis = fourthMoment / Math.pow(stdDev, 4);
      
        return kurtosis - 3; // Excess kurtosis (Fisher definition)
      }
      
      

      fetchAllData() {
        try {
          const payload: any = [
            { service: 'fetchAssetInfo', variable: 'assetInformation' },
          ]
          payload.forEach(element => {
            this.makeServiceCall({ hierarchy_id: this.hierarchyId }, element);
          });
          this.initializeChart();
        } catch (frameErr) {
          console.error(frameErr);
        }
      }
    
      makeServiceCall(payload: any, serviceData: any) {
        try {
          if (!payload?.hierarchy_id || !serviceData?.service || !serviceData?.variable) {
            return;
          }
          this.loader[serviceData?.variable] = true;
          this.appservice[serviceData?.service](payload).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
            if (res && res['status'] === 'success') {
              this[serviceData?.variable] = res?.data || {};
              this.loader[serviceData?.variable] = false;
            } else {
              this.loader[serviceData?.variable] = false;
              this.toaster.toast('error', 'Error', res['message'] || 'Please try again later.', true);
            }
          }, (resErr) => {
            console.error(resErr);
            this.loader[serviceData?.variable] = false;
            this.toaster.toast('error', 'Error', 'Please try again later.', true);
          });
        } catch (loadErr) {
          this.loader[serviceData?.variable] = false;
          this.toaster.toast('error', 'Error', 'Please try again later.', true);
          console.error(loadErr);
        }
      }

      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }

}
