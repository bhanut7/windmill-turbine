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

  public chartOptions: any = {
    rawData: {},
    comparison: {}
  }
  public chartData: any = {
    kurtosis: {},
    standardDeviation: {}
  };
  public titles: any = {
    rawData: null,
    comparison: null,
    kurtosis: 'Kurtosis',
    standardDeviation: 'Standard Deviation'
  }
  public loader: any = {}
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public paramterId: any = '';
  public hierarchyId: any = '';
  public chartModels: any  = ['rawData', 'comparison']
  
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
    this.chartModels.forEach(eachType => {
      this.loadData(eachType);
    });
    this.fetchStats();
  }


    loadData(type: any) {
        try {
          this.loader[type] = true;
          let serviceCall = 'fetchRawData';
          if (type === 'comparison') {
            serviceCall = 'rawDataComparison';
          }
          this.appservice[serviceCall]({hierarchy_id: this.hierarchyId}).pipe(takeUntil(this.destroy$)).subscribe(respData => {
            if (respData && respData['status'] === 'success') {
              this.titles[type] = respData?.data?.title || 'Chart Visualization';
              let tempChartOpt: any = respData?.data?.data || {};
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
                  eachData.data = respData.data?.data?.series[i].data.map((y, index) => [(index / (respData?.data.data.series[i].data.length/10)), y])
                }
              }
              this.chartOptions[type] = tempChartOpt;
              this.loader[type] = false;
            } else {
              this.loader[type] = false;
              this.toaster.toast('error', 'Error', respData['message'] || 'Error while fetching data.');
            }
          }, (error) => {
            this.loader[type] = false;
            this.toaster.toast('error', 'Error', 'Error while fetching data.');
            console.error(error);
          });
        } catch (table_error) {
          this.loader[type] = false;
          console.error(table_error)
        }
      }

      fetchStats() {
        try {
          this.loader['fetchStats'] = true;
          this.appservice.fetchLevelStats({hierarchy_id: this.hierarchyId}).pipe(takeUntil(this.destroy$)).subscribe(respData => {
            if (respData && respData['status'] === 'success') {
              let tempChartOpt: any = respData?.data || {};
              tempChartOpt.kurtosis = this.formatLabels(tempChartOpt.kurtosis);
              tempChartOpt.standardDeviation = this.formatLabels(tempChartOpt.standardDeviation)
              this.chartData = tempChartOpt;
              this.loader['fetchStats'] = false;
            } else {
              this.loader['fetchStats'] = false;
              this.toaster.toast('error', 'Error', respData['message'] || 'Error while fetching data.');
            }
          }, (error) => {
            this.loader['fetchStats'] = false;
            this.toaster.toast('error', 'Error', 'Error while fetching data.');
            console.error(error);
          });
        } catch (table_error) {
          this.loader['fetchStats'] = false;
          console.error(table_error)
        }
      }

      formatLabels(tempChartOpt) {
        try {
          if (tempChartOpt?.xAxis?.axisLabel?.formatter) {
            tempChartOpt.xAxis.axisLabel.formatter = eval(tempChartOpt.xAxis.axisLabel.formatter);
          }
          if (tempChartOpt?.yAxis?.axisLabel?.formatter) {
            tempChartOpt.yAxis.axisLabel.formatter = eval(tempChartOpt.yAxis.axisLabel.formatter);
          }
          return tempChartOpt;
        } catch (labelErr) {
          console.error(labelErr);
          return tempChartOpt;
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
