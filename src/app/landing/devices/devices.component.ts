import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wt-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  public filterOptions: any = [
    { value: '', label: 'Filter project' },
    { value: '1', label: 'Looper Admin Theme' },
    { value: '2', label: 'Smart Paper' },
    { value: '3', label: 'Booking Up' },
    { value: '4', label: 'Online Store' }
  ];

  public tasks: any = [
    {
      title: 'Make lemonade from scratch',
      startTime: '16:36',
      endTime: '24:00',
      dueDate: 'Apr 02',
      project: 'Smart Paper',
      progress: 66.67,
      todos: '4/6',
      comments: 12,
      members: [
        { name: 'Johnny Day', avatar: 'assets/images/avatars/uifaces2.jpg' },
        { name: 'Sarah Bishop', avatar: 'assets/images/avatars/uifaces3.jpg' },
        { name: 'Craig Hansen', avatar: 'assets/images/avatars/uifaces5.jpg' }
      ]
    },
    {
      title: 'Mix up a pitcher of sangria',
      startTime: '03:36',
      endTime: '04:00',
      dueDate: 'In 3 days',
      project: 'Looper Admin Theme',
      progress: 0,
      todos: '0/0',
      comments: 0,
      members: [
        { name: 'Johnny Day', avatar: 'assets/images/avatars/uifaces2.jpg' }
      ]
    },
    {
      title: 'Ride a roller coaster',
      startTime: '50:02',
      endTime: '48:00',
      dueDate: 'Tomorrow',
      project: 'Online Store',
      progress: 90.48,
      todos: '19/21',
      comments: 36,
      members: [
        { name: 'Johnny Day', avatar: 'assets/images/avatars/uifaces2.jpg' },
        { name: 'Sarah Bishop', avatar: 'assets/images/avatars/uifaces3.jpg' }
      ]
    }
    // Add more tasks as required
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
