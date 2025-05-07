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
    assetName: 'Bearing 1',
    assetData: {
      title: 'Asset Information',
      data: [
        { "label": "Site", "value": "Hamburg" },
        { "label": "Location", "value": "" },
        { "label": "Line", "value": "Sector 32" },
        { "label": "Make", "value": "SKF" },
        { "label": "Equipment", "value": "Windmill" },
        { "label": "Model", "value": "2307 EKTN9" },
        { "label": "Asset", "value": "Bearing 1" },
        { "label": "Downtime cost", "value": "€ 30.000" }
      ]
    },
    faultStatus: {
      title: 'Fault Status'
    },
    conditions: {
      title: 'Condition and RUL',
      data: [
        { "label": "Overall Health", "value": "Outer Race with severe defect", "status": "danger"},
        { "label": "Remaining Useful Life", "value": "21 days of operations" },
        { "label": "Alert", "value": "Anomaly detected on 17-01-2025" }
      ]
      
    }
  };
  public parameterData: any = {
    title: 'Operational Parameters',
    data:[
      {
        name: 'Temperature (°c)',
        lastUpdated: '1d ago',
        progress: 73
      },
      {
        name: 'RPM (hz)',
        lastUpdated: '3d ago',
        progress: 83
      },
      {
        name: 'Acceleration (m/s²)',
        lastUpdated: '6d ago',
        progress: 60
      }
    ]
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
  
  onTreeNodeSelected(event: any) {
    console.log('Selected Node:', event.data);
  }
  

  constructor(private router: Router, private appservice: AppService, private toaster: ToasterService) { 
    this.getHiearchyTree();
    this.frameDataPoints();
  }

  ngOnInit(): void {
  }

  getHiearchyTree() {
    try {
      const fetchPayload: any = {}
      this.appservice.getHierarchyTree(fetchPayload).pipe(takeUntil(this.destroy$)).subscribe((treeRes: any) => {
        if (treeRes && treeRes['status'] === 'success') {
          this.hierachy = treeRes['data'] || [];
          // this.loadData({parent_id: null});
        } else {
          this.toaster.toast('error', 'Error', treeRes['message'] || 'Please try again later.', true);
        }
      }, (treeResErr) => {
        console.error(treeResErr);
        this.toaster.toast('error', 'Error', 'Please try again later.', true);
      });
    } catch (treeErr) {
      this.toaster.toast('error', 'Error', 'Please try again later.', true);
      console.error(treeErr);
    }
  }

  frameDataPoints() {
    try {
      for (let eachData of this.parameterData?.data) {
        eachData['options'] = this.getOptions(eachData?.progress);
      }
    } catch (pointErr) {
      console.error(pointErr);
    }
  }

  openAssetAnalysis(analysisId: any) {
    try {
      this.router.navigate(['/app/devices/1/assets/1/1']);
    } catch (analysisErr) {
      console.error(analysisErr)
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
