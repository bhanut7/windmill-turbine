import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-device-dashboard',
  templateUrl: './device-dashboard.component.html',
  styleUrls: ['./device-dashboard.component.scss']
})
export class DeviceDashboardComponent implements OnInit {
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
    ],
    faultStatus: {
      title: 'Fault Status'
    },
    conditions: {
      title: 'Condition and RUL',
      conditionRul: [
        { "label": "Overall Health", "value": "Outer Race with severe defect", "status": "danger"},
        { "label": "Remaining Useful Life", "value": "21 days of operations" },
        { "label": "Alert", "value": "Anomaly detected on 17-01-2025" }
      ]
      
    }
  };
  public parameterNames: any = ['Temperature (°c)', 'RPM (hz)', 'Acceleration (m/s²)' ];
  public tasks: any = Array.from({ length: 3 }).map((_, index) => ({
    deadline: `07 Aug 20${18 + index}`,
    projectInitials: `P${index + 1}`,
    progress: Math.floor(Math.random() * 100),
    lastUpdate: `${Math.floor(Math.random() * 10)}d`,
    name: this.parameterNames[index],
    options: this.getOptions(Math.floor(Math.random() * 100), `Parameter ${Math.floor(Math.random() * 10)}`)
  }));

  getOptions(progress, name) {
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

  public hierachy: any = [
    {
      name: 'Plant A',
      type: 'site',
      children: [
        {
          name: 'Unit 1',
          type: 'equipment',
          children: [
            { name: 'Sensor A1', type: 'ast' },
            { name: 'Sensor A2', type: 'ast' }
          ]
        },
        {
          name: 'Unit 2',
          type: 'equipment',
          children: [
            { name: 'Sensor B1', type: 'ast' }
          ]
        }
      ]
    },
    {
      name: 'Plant B',
      type: 'site',
      children: [
        {
          name: 'Unit 3',
          type: 'equipment',
          children: [
            { name: 'Sensor C1', type: 'ast' }
          ]
        }
      ]
    }
  ];
  
  public treeOptions: any = {
    useVirtualScroll: true,
    nodeHeight: 24,
    allowDrag: false,
    animateExpand: true
  };
  
  onTreeNodeSelected(event: any) {
    console.log('Selected Node:', event.data);
  }
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openAssetAnalysis(analysisId: any) {
    try {
      this.router.navigate(['/app/devices/1/assets/1/1']);
    } catch (analysisErr) {
      console.error(analysisErr)
    }
  }

}
