import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../../../services/app.service';
import { CommonPopupService } from '../../../shared/common-popup/common-popup.service';
import { ToasterService } from '../../../shared/toastr/toaster.service';

@Component({
  selector: 'wt-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  
  public loader: any = {
    delete: false,
    list: false,
    conf: false,
  };
  public dropdownData: any = {
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
  };
  public filteredData: any = {
    site_id: '',
    line_id: '',
  };
  public agGridOptions: any;
  public subscription: Subscription;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  equipmentForm: FormGroup;
  public equipmentData: any = {
    equipment_name: null,
    description: null
  };
  public viewMode: any = false;

  constructor(private appservice: AppService, private toaster: ToasterService, private router: Router, public commonPopup: CommonPopupService) {
    this.equipmentForm = new FormGroup({
      equipment_name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator)
    });
    this.subscription = this.commonPopup.loaderState.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data['confirmation'] === 'Yes') {
        if (data['action'] === 'deleteEquipment') {
          this.deleteEquipment(data.data);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  get f() {
    return this.equipmentForm.controls;
  }

  loadData() {
    try {
      this.loader.table = true;
      this.appservice.getEquipments().pipe(takeUntil(this.destroy$)).subscribe(respData => {
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
                fileName: "Equipment",
                "noLabel": true,
              });
            }
          } else {
            this.agGridOptions['tableActions']['externalActions'] = [{
              "label": "Download",
              "action": "download",
              "type": "download",
              "icon-class": "download",
              fileName: "Equipment",
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
          this.equipmentData = event.data;
          this.openModal('equipmentModalBtn');
          break;
        case 'addnew':
          this.openModal('equipmentModalBtn');
          break;
        case 'edit':
          this.equipmentData = event.data;
          this.openModal('equipmentModalBtn');
          break;
        case 'delete': 
          const message = `Are you sure you want to delete the equipment?`;
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

  configureEquipment() {
    try {
      if (this.equipmentForm.invalid) {
        this.validateAllFormFields(this.equipmentForm);
        this.toaster.toast('warning', 'Warning', 'Please fill all the required fields.', true);
        return;
      }
      let confPayload = this.equipmentData;
      let serviceName = 'addEquipment';
      if (confPayload?.equipment_id) {
        serviceName = 'editEquipment';
      } else {
        delete confPayload['equipment_id'];
      }
      this.loader['conf'] = true;
      this.appservice[serviceName](confPayload).pipe(takeUntil(this.destroy$)).subscribe((confRes: any) => {
        if (confRes?.['status'] === 'success') {
          this.loader['conf'] = false;
          this.toaster.toast('success', 'Success', confRes['message'] || `Equipment ${confPayload?.equipment_id ? `saved` : `updated`} successfully.`, true);
          this.openModal('closeEquipmentBtn');
          this.loadData();
        } else {
          this.toaster.toast('error', 'Error', confRes['message'] || `Failed to ${confPayload?.equipment_id ? `save` : `update`} Organizations.`, true);
          this.loader['conf'] = false;
        }
      }, (listingError) => {
        console.error(listingError);
        this.toaster.toast('error', 'Error', `Failed to ${confPayload?.equipment_id ? `save` : `update`} Organizations.`, true);
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

  onFilterChange() {}

  deleteEquipment(data: any) {
    try {
      const deletePayload: any = {
        equipment_id: data.data.equipment_id
      }
      this.loader['delete'] = true;
      this.appservice.deleteEquipment(deletePayload).pipe(takeUntil(this.destroy$)).subscribe((delRes: any) => {
        if (delRes && delRes['status'] === 'success') {
          this.loader['delete'] = false;
          this.toaster.toast('success', 'Success', delRes['message'] || 'Equipment deleted successfully.', true);
          this.loadData();
        } else {
          this.loader['delete'] = false;
          this.toaster.toast('error', 'Error', delRes['message'] || 'Failed to delete equipment.', true);
        }
      }, (listError) => {
        console.error(listError);
        this.loader['delete'] = false;
        this.toaster.toast('error', 'Error', 'Failed to delete equipment.', true);
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
