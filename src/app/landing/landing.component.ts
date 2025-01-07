import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wt-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  menuOpen = false;

  constructor() { }
  
  ngOnInit(): void {
    this.toggleSidebar();
  }
  
  toggleSidebar() {
    this.menuOpen = !this.menuOpen;
    // this.updatePage();
  }

  updatePage() {
    try {
      const sidebar = document.querySelector('.app-aside');
      const root = document.documentElement;
  
      sidebar.classList.toggle('open');
      if (sidebar.classList.contains('open')) {
          root.style.setProperty('--sidebarWidth', '15rem');
      } else {
          root.style.setProperty('--sidebarWidth', '4rem');
      }
    } catch(pageErr) {
      console.error(pageErr);
    }
  }

}
