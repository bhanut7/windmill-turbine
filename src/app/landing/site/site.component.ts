import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../../services/app.service';
import { CommonPopupService } from '../../shared/common-popup/common-popup.service';
import { ToasterService } from '../../shared/toastr/toaster.service';

@Component({
  selector: 'wt-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  public loader: any = {
    delete: false,
    list: false,
    conf: false,
  };
  public agGridOptions: any;
  public subscription: Subscription;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  siteForm: FormGroup;
  public siteData: any = {
    site_name: null,
    description: null,
    langitude: null,
    lattitude: null,
    state: null,
    address: null,
    city: null,
    country: null,
    pincode: null
  };
  public viewMode: any = false;

  constructor(private appservice: AppService, private toaster: ToasterService, private router: Router, public commonPopup: CommonPopupService) {
    this.siteForm = new FormGroup({
      site_name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator),
      longitude: new FormControl('', [Validators.nullValidator]),
      lattitude: new FormControl('', [Validators.nullValidator]),
      state: new FormControl('', Validators.nullValidator),
      address: new FormControl('', Validators.nullValidator),
      city: new FormControl('', Validators.nullValidator),
      country: new FormControl('', Validators.nullValidator),
      pincode: new FormControl('', [Validators.nullValidator, Validators.pattern(/^\d{5,6}$/)])
    });
    this.subscription = this.commonPopup.loaderState.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data['confirmation'] === 'Yes') {
        if (data['action'] === 'deleteSite') {
          this.deleteSite(data.data);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  get f() {
    return this.siteForm.controls;
  }

  loadData() {
    try {
      this.loader.table = true;
      this.appservice.getSites().pipe(takeUntil(this.destroy$)).subscribe(respData => {
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
                fileName: "Site",
                "noLabel": true,
              });
            }
          } else {
            this.agGridOptions['tableActions']['externalActions'] = [{
              "label": "Download",
              "action": "download",
              "type": "download",
              "icon-class": "download",
              fileName: "Site",
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
      console.log(event);
      if (!event || !event?.action?.type) {
        return;
      }
      switch (event['action']?.type) {
        case 'view':
          this.viewMode = true;
          this.siteData = event.data;
          this.openModal('siteModalBtn');
          break;
        case 'addnew':
          this.openModal('siteModalBtn');
          break;
        case 'edit':
          this.siteData = event.data;
          this.openModal('siteModalBtn');
          break;
        case 'delete': {
          const message = `Are you sure you want to delete the site?`;
          this.commonPopup.triggerPopup('deletion', 'Confirm Deletion', message, true, 'deleteOrganization', event);
          break;
          }
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

  configureSite() {
    try {
      if (this.siteForm.invalid) {
        this.validateAllFormFields(this.siteForm);
        this.toaster.toast('warning', 'Warning', 'Please fill all the required fields.', true);
        return;
      }
      let confPayload = this.siteData;
      let serviceName = 'addSite';
      if (confPayload?.site_id) {
        serviceName = 'editSite';
      } else {
        delete confPayload['site_id'];
      }
      this.loader['conf'] = true;
      this.appservice[serviceName](confPayload).pipe(takeUntil(this.destroy$)).subscribe((confRes: any) => {
        if (confRes?.['status'] === 'success') {
          this.loader['conf'] = false;
          this.toaster.toast('success', 'Success', confRes['message'] || `Site ${confPayload?.site_id ? `saved` : `updated`} successfully.`, true);
          this.openModal('closeSiteBtn');
          this.loadData();
        } else {
          this.toaster.toast('error', 'Error', confRes['message'] || `Failed to ${confPayload?.site_id ? `save` : `update`} Organizations.`, true);
          this.loader['conf'] = false;
        }
      }, (listingError) => {
        console.error(listingError);
        this.toaster.toast('error', 'Error', `Failed to ${confPayload?.site_id ? `save` : `update`} Organizations.`, true);
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

  closeOrgModal() {
    try {
      this.siteData = {
        site_name: null,
        description: null,
        langitude: null,
        lattitude: null,
        state: null,
        address: null,
        city: null,
        country: null,
        pincode: null
      };
      this.viewMode = false;
    } catch (orgErr) {
      console.error(orgErr);
    }
  }

  deleteSite(data: any) {
    try {
      const deletePayload: any = {
        site_id: data.data.site_id
      }
      this.loader['delete'] = true;
      this.appservice.deleteSite(deletePayload).pipe(takeUntil(this.destroy$)).subscribe((delRes: any) => {
        if (delRes && delRes['status'] === 'success') {
          this.loader['delete'] = false;
          this.toaster.toast('success', 'Success', delRes['message'] || 'Site deleted successfully.', true);
          this.loadData();
        } else {
          this.loader['delete'] = false;
          this.toaster.toast('error', 'Error', delRes['message'] || 'Failed to delete site.', true);
        }
      }, (listError) => {
        console.error(listError);
        this.loader['delete'] = false;
        this.toaster.toast('error', 'Error', 'Failed to delete site.', true);
      });
    } catch (delErr) {
      this.loader['delete'] = false;
      console.error(delErr);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
