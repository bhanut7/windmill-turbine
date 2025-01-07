import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../../services/app.service';
import { ToasterService } from '../../shared/toastr/toaster.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonPopupService } from '../../shared/common-popup/common-popup.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wt-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  public subscription: Subscription;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public tableData: any = {
    tableData: {
      headerContent: [],
      bodyContent: [],
    },
    tableActions: {
      enableActions: true,
      actions: [
        {
          action: 'view',
          label: 'View',
          type: 'view',
          'icon-class': 'd-none',
        },
        {
          action: 'share',
          label: 'Share',
          type: 'share',
          'icon-class': 'fa-share-alt',
        },
        {
          action: 'edit',
          label: 'Edit',
          type: 'edit',
          'icon-class': 'fa-pencil',
        },
        {
          action: 'delete',
          label: 'Delete',
          type: 'delete',
          'icon-class': 'fa-trash',
        }

      ],
      externalActions: [
        {
          "label": "Create New",
          "type": "addnew",
          "action": "addnew",
          "icon-class": "add"
        }
      ],
    },
    enableRowClick: false,
    // hideSearch: true,
    // hideExternal: true,
    table_type: 'client_side',
    counter: 1,
    loader_status: false,
    endOfRecords: false,
  };

  public loaders: any = {
    delete: false,
    list: false,
    conf: false,
  };
  organizationForm: FormGroup;
  public organization: any = {
    organization_name: null,
    description: null,
    first_phn_num: null,
    second_phn_num: null,
    email: null,
    address_line1: null,
    address_line2: null,
    city: null,
    country: null,
    pincode: null
  };
  public columnDefs: any = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];

  public rowData = [
    { make: 'Toyota', model: 'Corolla', price: 35000 },
    { make: 'Ford', model: 'Focus', price: 32000 },
    { make: 'BMW', model: 'X3', price: 72000 }
  ];

  constructor(private appService: AppService, public _toaster: ToasterService, private router: Router, public commonPopup: CommonPopupService) {
    this.organizationForm = new FormGroup({
      organization_name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator),
      first_phn_num: new FormControl('', [Validators.required]),
      second_phn_num: new FormControl('', [ Validators.nullValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address_line1: new FormControl('', Validators.required),
      address_line2: new FormControl(''),
      city: new FormControl('', Validators.nullValidator),
      country: new FormControl('', Validators.nullValidator),
      pincode: new FormControl('', [Validators.nullValidator, Validators.pattern(/^\d{5,6}$/)])
    });
    this.subscription = this.commonPopup.loaderState.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data['confirmation'] === 'Yes') {
        if (data['action'] === 'deleteOrganization') {
          this.deleteOrganization(data.data);
        }
      }
    });
  }

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations() {
    try {
      try {
        const orgPayload = {};
        this.loaders['list'] = true;
        this.appService.getOrganizations(orgPayload).pipe(takeUntil(this.destroy$)).subscribe((listingResponse) => {
          if (listingResponse && listingResponse?.['status'] === 'success') {
            this.tableData = { ...this.tableData, ...listingResponse.data};
            this.loaders['list'] = false;
          } else {
            this._toaster.toast('error', 'Error', listingResponse['message'] || 'Failed to fetch Organizations.', true);
            this.loaders['list'] = false;
          }
        }, (listingError) => {
          console.error(listingError);
          this._toaster.toast('error', 'Error', 'Failed to fetch Organizations.', true);
          this.loaders['list'] = false;
        });
      } catch (tableError) {
        this.loaders['list'] = false;
        console.error(tableError);
      }
    } catch (err) {
      this.loaders['list'] = false;
      console.error(err);
    }
  }

  emittedActions(event) {
    console.log(event);
    switch (event['action']?.type) {
      case 'view':
        this.router.navigate(['p', 'settings', 'forms', 'logbooks', 'configurations-view', 'view', window.btoa(encodeURIComponent(JSON.stringify(event.data)))]);
        break;
      case 'addnew':
        // this.router.navigate(['p/settings/forms/logbooks/configurations/new']);
        this.openModal('organizationModalBtn');
        // this.configureOrganization();
        break;
      case 'edit':
          // this.router.navigate(['p/settings/forms/logbooks/configurations/new']);
          this.organization = event.data;
          this.openModal('organizationModalBtn');
        break;
      case 'delete': {
        const message = `Are you sure you want to delete the organization?`;
        this.commonPopup.triggerPopup('deletion', 'Confirm Deletion', message, true, 'deleteOrganization', event);
        break;
        }
    }
  }

  get f() {
    return this.organizationForm.controls;
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

  configureOrganization() {
      try {
        if (this.organizationForm.invalid) {
          this.validateAllFormFields(this.organizationForm);
          this._toaster.toast('warning', 'Warning', 'Please fill all the required fields.', true);
          return;
        }
        let confPayload = this.organization;
        let serviceName = 'addOrganization';
        if (confPayload?.organization_id) {
          serviceName = 'editOrganization';
        } else {
          delete confPayload['organization_id'];
        }
        this.loaders['conf'] = true;
        this.appService[serviceName](confPayload).pipe(takeUntil(this.destroy$)).subscribe((confRes: any) => {
          if (confRes?.['status'] === 'success') {
            this.loaders['conf'] = false;
            this._toaster.toast('success', 'Success', confRes['message'] || `Organization ${confPayload?.organization_id ? `saved` : `updated`} successfully.`, true);
            this.openModal('closeOrgBtn');
            this.getOrganizations();
          } else {
            this._toaster.toast('error', 'Error', confRes['message'] || `Failed to ${confPayload?.organization_id ? `save` : `update`} Organizations.`, true);
            this.loaders['conf'] = false;
          }
        }, (listingError) => {
          console.error(listingError);
          this._toaster.toast('error', 'Error', `Failed to ${confPayload?.organization_id ? `save` : `update`} Organizations.`, true);
          this.loaders['conf'] = false;
        });
      } catch (confError) {
        this.loaders['conf'] = false;
        console.error(confError);
      }
  }

  closeOrgModal() {
    try {
      this.organization = {
        organization_name: null,
        description: null,
        first_phn_num: null,
        second_phn_num: null,
        email: null,
        address_line1: null,
        address_line2: null,
        city: null,
        country: null,
        pincode: null
      };
    } catch (orgErr) {
      console.error(orgErr);
    }
  }

  deleteOrganization(data: any) {
    try {
      const deletePayload: any = {
        organization_id: data.data.organization_id
      }
      this.loaders['delete'] = true;
    this.appService.deleteOrganization(deletePayload).pipe(takeUntil(this.destroy$)).subscribe((delRes: any) => {
      if (delRes && delRes['status'] === 'success') {
        this.loaders['delete'] = false;
        this._toaster.toast('success', 'Success', delRes['message'] || 'Organization deleted successfully.', true);
        this.getOrganizations();
      } else {
        this.loaders['delete'] = false;
        this._toaster.toast('error', 'Error', delRes['message'] || 'Failed to delete organization.', true);
      }
    }, (listError) => {
      console.error(listError);
      this.loaders['delete'] = false;
      this._toaster.toast('error', 'Error', 'Failed to delete organization.', true);
    });
  } catch (delErr) {
    this.loaders['delete'] = false;
    console.error(delErr);
  }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
