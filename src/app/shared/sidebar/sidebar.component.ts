import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() menuOpen: boolean = false;
  menuItems: any = [
    { 
      "name": "Home", 
      "title": "Dashboard",
      "icon": "fa fa-home",
      "link": "/app/dashboard" 
    },
    { 
      "name": "Device Management", 
      "icon": "fa fa-cogs", 
      "badge": "New",
      "subItems": [
        { "name": "Devices", "link": "javascript:void(0)" }
      ]
    },
    { 
      "name": "User Management", 
      "icon": "fa fa-users", 
      "badge": "New",
      "subItems": [
        { "name": "Users", "link": "javascript:void(0)"},
        { "name": "User Roles", "link": "javascript:void(0)"},
      ]
    },
    { 
      "name": "Logs", 
      "icon": "fa fa-history", 
      "link": "javascript:void(0)" 
    }
  ];  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeTo(route: any) {
    try {
      if (!route) {
        return;
      }
      this.router.navigate([route]);
    } catch (routeErr) {
      console.error(routeErr);
    }
  }

}
