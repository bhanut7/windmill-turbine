import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { ToasterService } from 'src/app/shared/toastr/toaster.service';

@Component({
  selector: 'wt-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  public equipmentForm: FormGroup = new FormGroup({
    equipment_name: new FormControl({ value: null, disabled: false }, [Validators.required]),
    description: new FormControl({ value: null, disabled: false }, [Validators.required]),
  });
  public loader: any = {
    table: false,
    delete: false,
  };
  public agGridOptions : any ;
    public destroy$: Subject<boolean> = new Subject<boolean>();
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
    public equipmentData: any = {
      equipment_name: null,
      description: null,
    };

  constructor(private appservice: AppService, private toaster: ToasterService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
      try {
        const equipmentJson: any  = {};
        this.loader.table = true;
        this.appservice.getEquipments(equipmentJson).pipe(takeUntil(this.destroy$)).subscribe(respData => {
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

    onFilterChange() {}
  
    aggridEmitter(event: any) {
      try {
        if (!event || !event?.action?.type) {
          return;
        }
        if (event && event?.action?.type) {
          switch(event.action.type) {
            case 'addnew':
              
              break
            case 'edit':
              
              break;
            case 'delete':
              // const message1 = `Are you sure do you want to delete this site?`;
              // this.commonPopup.triggerPopup('deletion', 'Confirmation', message1, true, `delete_site`, event);
              break;
          }
        }
      } catch (aggridErr) {
        console.error(aggridErr);
      }
    }

    createEquipment() {
      try {

      } catch(equipErr) {
        console.error(equipErr);
      }
    }

}
