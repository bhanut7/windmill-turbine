import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToasterService } from '../../shared/toastr/toaster.service';

@Component({
  selector: 'wt-device-dashboard',
  templateUrl: './device-dashboard.component.html',
  styleUrls: ['./device-dashboard.component.scss']
})
export class DeviceDashboardComponent implements OnInit {
  public meta: any = {
    deviceName: 'Windmill 1',
    assetName: 'Bearing 1'
  };
  public assetData: any = {
    title: 'Asset Information',
    data: []
  };
  public conditions: any = {
    title: 'Condition and RUL',
    data: []
  }
  public parameterData: any = {
    title: 'Operational Parameters',
    data:[]
  };

  getOptions(progress) {
    const options = {
      tooltip: {
        formatter: '{b} : {c}%'
      },
      type: 'gauge',
      series: [
        {
          type: 'gauge',
          progress: {
            show: true
          },
          radius: '100%',
      center: ['50%', '50%'],
          detail: {
            valueAnimation: true,
            formatter: '{value}',
            fontSize: 14, 
        color: '#333',
        offsetCenter: [0, '65%']
          },
          title: {
            fontSize:10, // Smaller font size for the name (e.g., "SCORE")
            color: '#666',
            offsetCenter: [0, '80%']
          },
          axisLabel: {
            fontSize: 10, // Smaller font size for tick labels
            color: '#888' // Optional: Adjust tick label color
          },
          axisTick: {
            length:5, // Shorter ticks
            lineStyle: {
              width: 1, // Thinner tick marks
              color: '#aaa' // Optional: Adjust tick color
            }
          },
          splitLine: {
            length: 10, // Shorter split lines
            lineStyle: {
              width: 2, // Thinner split lines
              color: '#aaa' // Optional: Adjust color
            }
          },
          pointer: {
            width: 3
          },
          data: [
            {
              value: progress
            }
          ]
        }
      ]
    };
    return options;
  };

  public hierachy: any = [];
  
  public treeOptions: any = {
    useVirtualScroll: true,
    nodeHeight: 24,
    allowDrag: false,
    animateExpand: true
  };
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public loader: any = {};
  public selectedHierarchyId: any = '';
  
  onTreeNodeSelected(event: any) {
    console.log('Selected Node:', event.data);
    try {
      if (event?.data?.is_last) {
        this.selectedHierarchyId = event.data?.hierarchy_id || '';
        this.fetchAllData();
      }
    } catch (eventErr) {
      console.error(eventErr);
    }
  }
  

  constructor(private router: Router, private appservice: AppService, private toaster: ToasterService) { 
    this.getHiearchyTree();
  }

  ngOnInit(): void {
  }

  fetchAllData() {
    try {
      const payload: any = [
        { service: 'fetchAssetInfo', variable: 'assetData' },
        { service: 'getParameterValues', variable: 'parameterData' },
        { service: 'fetchDeviceCheck', variable: 'conditions' }
      ]
      payload.forEach(element => {
        this.makeServiceCall({ hierarchy_id: this.selectedHierarchyId }, element);
      });
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
          if (serviceData?.variable === 'parameterData') {
            this.frameDataPoints();
          }
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

  getHiearchyTree() {
    try {
      const fetchPayload: any = {};
      this.loader['hierarchy'] = true;
      this.appservice.getHierarchyTree(fetchPayload).pipe(takeUntil(this.destroy$)).subscribe((treeRes: any) => {
        if (treeRes && treeRes['status'] === 'success') {
          this.hierachy = treeRes['data'] || [];
          this.loader['hierarchy'] = false;
          // this.loadData({parent_id: null});
        } else {
          this.toaster.toast('error', 'Error', treeRes['message'] || 'Please try again later.', true);
          this.loader['hierarchy'] = false;
        }
      }, (treeResErr) => {
        console.error(treeResErr);
        this.loader['hierarchy'] = false;
        // this.toaster.toast('error', 'Error', 'Please try again later.', true);
      });
    } catch (treeErr) {
      this.toaster.toast('error', 'Error', 'Please try again later.', true);
      this.loader['hierarchy'] = false;
      console.error(treeErr);
    }
  }

  frameDataPoints() {
    try {
      for (let eachData of this.parameterData?.data) {
        eachData.progress = Math.round(eachData.progress * 100) / 100;
        eachData['options'] = this.getOptions(eachData?.progress);
      }
    } catch (pointErr) {
      console.error(pointErr);
    }
  }

  openAssetAnalysis(task: any) {
    try {
      if (!this.selectedHierarchyId || !task.parameter_id) {
        return;
      }
      this.router.navigate([`/app/asset-dashboard/${this.selectedHierarchyId}/${task.parameter_id}`]);
    } catch (analysisErr) {
      console.error(analysisErr)
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
