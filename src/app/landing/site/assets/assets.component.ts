import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../../../services/app.service';
import { CommonPopupService } from '../../../shared/common-popup/common-popup.service';
import { ToasterService } from '../../../shared/toastr/toaster.service';

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
    ],
    sites: [
      { site_id: '', site_name: 'Select Site' },
      { site_id: 'site_0', site_name: 'Hamburg' },
      { site_id: 'site_1', site_name: 'Rostock' }
    ],
    lines: [
      { line_id: '', line_name: 'Select Line' },
      { line_id: 'line_0', line_name: 'Server cooling room' },
      { line_id: 'line_1', line_name: 'Chiller room' },
    ],
    equipments: [
      { equipment_id: '', equipment_name: 'Select Equipment' },
      { equipment_id: 'equipment_0', equipment_name: 'Server cooling room' },
      { equipment_id: 'equipment_1', equipment_name: 'Chiller room' },
    ],
  };
  public filteredData: any = {
    site_id: '',
    line_id: '',
    equipment_id: '',
    status: '',
  };
  
  public loader: any = {
    delete: false,
    list: false,
    conf: false,
  };
  public agGridOptions: any;
  public subscription: Subscription;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  assetForm: FormGroup;
  public assetData: any = {
    asset_name: null,
    description: null,
    parameters: [],
    asset_type: null,
  };
  public viewMode: any = false;

  constructor(private appservice: AppService, private toaster: ToasterService, private router: Router, public commonPopup: CommonPopupService) {
    this.assetForm = new FormGroup({
      asset_name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator),
      parameters: new FormControl('', Validators.nullValidator),
      asset_type: new FormControl('', Validators.nullValidator)
    });
   }

   ngOnInit(): void {
    this.loadData();
  }

  get f() {
    return this.assetForm.controls;
  }

  loadData() {
    try {
      this.loader.table = true;
      this.appservice.getAssets().pipe(takeUntil(this.destroy$)).subscribe(respData => {
        if (respData && respData['status'] === 'success') {
          this.agGridOptions = respData.data;
          // this.agGridOptions['tableActions'] = this._util.updateActions(this.agGridOptions['tableActions'], this.userRolePermissions);
          // this.agGridOptions['clickableColumns'] = this._util.clickableCol(this.agGridOptions, this.agGridOptions?.clickableColumns || [], this.userRolePermissions);
          if (this.agGridOptions['tableActions']?.externalActions?.length) {
            const downloadInd: any = this.agGridOptions['tableActions']?.externalActions.findIndex((ele: any) => ele.type === 'download');
            if (!(downloadInd > -1)) {
              this.agGridOptions['tableActions']['externalActions'].unshift({
                "label": "Download",
                "action": "download",
                "type": "download",
                "icon-class": "download",
                fileName: "Asset",
                "noLabel": true,
              });
            }
          } else {
            this.agGridOptions['tableActions']['externalActions'] = [{
              "label": "Download",
              "action": "download",
              "type": "download",
              "icon-class": "download",
              fileName: "Asset",
              "noLabel": true,
            }];
          }
          this.loader.table = false;
        } else {
          this.loader.table = false;
          this.toaster.toast('error', 'Error', respData['message'] || 'Error while fetching data.');
        }
      }, (error) => {
        this.loader.table = false;
        this.toaster.toast('error', 'Error', 'Error while fetching data.');
        console.error(error);
      });
    } catch (table_error) {
      this.loader.table = false;
      console.error(table_error)
    }
  }

  aggridEmitter(event: any) {
    try {
      if (!event || !event?.action?.type) {
        return;
      }
      switch (event['action']?.type) {
        case 'view':
          this.viewMode = true;
          this.assetData = event.data;
          this.openModal('assetModalBtn');
          break;
        case 'addnew':
          this.openModal('assetModalBtn');
          break;
        case 'edit':
          this.assetData = event.data;
          this.openModal('assetModalBtn');
          break;
        case 'delete': 
          const message = `Are you sure you want to delete the asset?`;
          this.commonPopup.triggerPopup('deletion', 'Confirm Deletion', message, true, 'deleteOrganization', event);
          break;
      }
    } catch (aggridErr) {
      console.error(aggridErr);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    try {
      Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  configureAsset() {
    try {
      if (this.assetForm.invalid) {
        this.validateAllFormFields(this.assetForm);
        this.toaster.toast('warning', 'Warning', 'Please fill all the required fields.', true);
        return;
      }
      let confPayload = this.assetData;
      let serviceName = 'addAsset';
      if (confPayload?.asset_id) {
        serviceName = 'editAsset';
      } else {
        delete confPayload['asset_id'];
      }
      this.loader['conf'] = true;
      this.appservice[serviceName](confPayload).pipe(takeUntil(this.destroy$)).subscribe((confRes: any) => {
        if (confRes?.['status'] === 'success') {
          this.loader['conf'] = false;
          this.toaster.toast('success', 'Success', confRes['message'] || `Asset ${confPayload?.asset_id ? `saved` : `updated`} successfully.`, true);
          this.openModal('closeAssetBtn');
          this.loadData();
        } else {
          this.toaster.toast('error', 'Error', confRes['message'] || `Failed to ${confPayload?.asset_id ? `save` : `update`} Organizations.`, true);
          this.loader['conf'] = false;
        }
      }, (listingError) => {
        console.error(listingError);
        this.toaster.toast('error', 'Error', `Failed to ${confPayload?.asset_id ? `save` : `update`} Organizations.`, true);
        this.loader['conf'] = false;
      });
    } catch (confError) {
      this.loader['conf'] = false;
      console.error(confError);
    }
  }

  openModal(id: any) {
    try {
      const DOMEle: any = document.getElementById(id);
      if (DOMEle) {
        DOMEle.click();
      }
    } catch(idErr) {
      console.error(idErr);
    }
  }

  onFilterChange() {
    try {

    } catch (err) {
      console.error(err);
    }
  }

  deleteAsset(data: any) {
    try {
      const deletePayload: any = {
        asset_id: data.data.asset_id
      }
      this.loader['delete'] = true;
      this.appservice.deleteAsset(deletePayload).pipe(takeUntil(this.destroy$)).subscribe((delRes: any) => {
        if (delRes && delRes['status'] === 'success') {
          this.loader['delete'] = false;
          this.toaster.toast('success', 'Success', delRes['message'] || 'Asset deleted successfully.', true);
          this.loadData();
        } else {
          this.loader['delete'] = false;
          this.toaster.toast('error', 'Error', delRes['message'] || 'Failed to delete asset.', true);
        }
      }, (listError) => {
        console.error(listError);
        this.loader['delete'] = false;
        this.toaster.toast('error', 'Error', 'Failed to delete asset.', true);
      });
    } catch (delErr) {
      this.loader['delete'] = false;
      console.error(delErr);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
