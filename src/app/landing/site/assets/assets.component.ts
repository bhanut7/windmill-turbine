import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  public dropdownData: any = {
    status: [
      { value: '', label: 'Status' },
      { value: 'offline', label: 'Offline' },
      { value: 'online', label: 'Online' }
    ]
  };
  public filteredData: any = {
    status: '',
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onFilterChange() {
    try {

    } catch (err) {
      console.error(err);
    }
  }

  navigateTo(eachItem) {
    try {
      if (!eachItem) {
        return;
      }
      this.router.navigate(['/app/devices/1/assets/1']);
    } catch (navErr) {
      console.error(navErr);
    }
  }

}
