import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'wt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<any>();
  activities = [
    { user: 'Jeffrey Wells', action: 'created a schedule', time: 'Just now', img: 'assets/images/avatars/uifaces15.jpg' },
    { user: 'Anna Vargas', action: 'logged a chat', time: '3 hours ago', img: 'assets/images/avatars/uifaces16.jpg' }
  ];

  messages = [
    { user: 'John Doe', content: 'Sent you a message', time: '2 hours ago', img: 'assets/images/avatars/uifaces17.jpg' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
