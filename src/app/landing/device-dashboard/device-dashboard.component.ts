import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-device-dashboard',
  templateUrl: './device-dashboard.component.html',
  styleUrls: ['./device-dashboard.component.scss']
})
export class DeviceDashboardComponent implements OnInit {
  public tasks: any = Array.from({ length: 10 }).map((_, index) => ({
    deadline: `07 Aug 20${18 + index}`,
    projectInitials: `P${index + 1}`,
    progress: Math.floor(Math.random() * 100),
    lastUpdate: `${Math.floor(Math.random() * 10)}d`,
    name: `Parameter ${Math.floor(Math.random() * 10)}`,
    options: this.getOptions(Math.floor(Math.random() * 100), `Parameter ${Math.floor(Math.random() * 10)}`)
  }));

  getOptions(progress, name) {
    const options = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      type: 'gauge',
      series: [
        {
          name: name,
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
              value: progress,
              name: name
            }
          ]
        }
      ]
    };
    return options;
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
