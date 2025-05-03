import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { AppService } from '../../services/app.service';
import { CommonPopupService } from '../../shared/common-popup/common-popup.service';
import { ToasterService } from '../../shared/toastr/toaster.service';
import { HierarchyService } from './hierarchy.service';

@Component({
  selector: 'wt-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnInit {

  public loader: any = {
    delete: false,
    list: false,
    conf: false,
    fetch: false,
  };
  public agGridOptions: any;
  public subscription: Subscription;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public viewMode: any = false;
  public formConfig: any = {};
  public formData: any = {item_values: {}};
  public currentParentId: any = null;
  public editedHierarchy: any = {
    hierarchy_id: null,
    data: null
  };
  
  get currentHierarchyStack() {
    return this.hierarchyService.currentStack;
  }

  get hierarchyLevels() {
    return this.hierarchyService.levels;
  }

  get currentHierarchyLevel() {
    return this.hierarchyService.currentLevel;
  }

  get currentLevelIndex() {
    const findInd = this.hierarchyLevels.findIndex((ele: any) => ele.id === this.currentHierarchyLevel?.id);
    if (findInd > -1) {
      return findInd;
    }
    return null;
  }

  constructor(private hierarchyService: HierarchyService, private route: ActivatedRoute, private appservice: AppService, private toaster: ToasterService, private router: Router, public commonPopup: CommonPopupService) {
    this.subscription = this.commonPopup.loaderState.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data['confirmation'] === 'Yes') {
        if (data['action'] === 'deleteHiearchyItem') {
          this.deleteHiearchyItem(data.data);
        }
      }
    });
    this.fetchLevels();
    this.hierarchyService.hierarchyStack$.pipe(skip(1)).subscribe(() => {
      this.setTheHierarchyPage(this.currentHierarchyLevel);
    });
    
  }

  fetchLevels() {
    try {
      const fetchPayload: any = {}
      this.appservice.fetchLevels(fetchPayload).pipe(takeUntil(this.destroy$)).subscribe((levelRes: any) => {
        if (levelRes && levelRes['status'] === 'success') {
          this.hierarchyService.levels = levelRes['data'];
          this.hierarchyService.currentLevel = this.hierarchyService.levels?.length ? this.hierarchyService.levels[0] : undefined;
          this.loadData({parent_id: null});
        } else {
          this.toaster.toast('error', 'Error', levelRes['message'] || 'Please try again later.', true);
        }
      }, (listError) => {
        console.error(listError);
        this.toaster.toast('error', 'Error', 'Please try again later.', true);
      });
    } catch (delErr) {
      this.toaster.toast('error', 'Error', 'Please try again later.', true);
      console.error(delErr);
    }
  }

  changeHierarchy(eachLevel: any, ind: any) {
    try {
      const hierarchyCurrInd = this.hierarchyService.levels.findIndex((ele: any) => ele.id === this.currentHierarchyLevel.id );
      if (!(hierarchyCurrInd > -1)) { return; }
      if ((ind+1) === this.hierarchyLevels?.length || ind > hierarchyCurrInd) {
        return;
      }
      this.hierarchyService.currentLevel = eachLevel;
      const acheivedLevel: any = this.getPrevious(this.currentHierarchyStack, ind + 1);
      this.hierarchyService.pushLevel(acheivedLevel);
    } catch (hierErr) {
      console.error(hierErr);
    }
  }

  getPrevious(obj: any, key: number) { 
    const result: any = {}; 
  
    
    const keys = Object.keys(obj).map(Number).sort((a, b) => a - b);
  
    for (const k of keys) {
      if (k === key) break;
      result[k] = obj[k];
    }
  
    return result;
  }

  setTheHierarchyPage(currLevel: any) {
    try {
      const ind = this.hierarchyLevels.findIndex((ele: any) => ele.id === currLevel.id);
      if (ind > -1) {
        const hierarchyId: any = this.currentHierarchyStack[ind] || null;
        const hierarchyJSON: any = {};
        if (ind > 0) {
          hierarchyJSON["parent_id"] = hierarchyId
          // hierarchyJSON[this.hierarchyLevels[ind-1]?.key] = hierarchyId
        }
        console.log(hierarchyJSON);
        this.loadData(hierarchyJSON);
      }
    } catch (pageErr) {
      console.error(pageErr);
    }
  }

  ngOnInit(): void {
  }

  loadData(extendedJSON: any) {
    try {
      let payload: any = {
        level_id: this.hierarchyService.currentLevel?.id,
      };
      if (extendedJSON && Object.keys(extendedJSON)?.length) {
        payload = { ...payload, ...extendedJSON};
      }
      this.loader.list = true;
      this.appservice.getHierarchyTable(payload).pipe(takeUntil(this.destroy$)).subscribe(respData => {
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
          this.loader.list = false;
        } else {
          this.agGridOptions = undefined;
          this.loader.list = false;
          this.toaster.toast('error', 'Error', respData['message'] || 'Error while fetching data.');
        }
      }, (error) => {
        this.agGridOptions = undefined;
        this.loader.list = false;
        this.toaster.toast('error', 'Error', 'Error while fetching data.');
        console.error(error);
      });
    } catch (table_error) {
      this.agGridOptions = undefined;
      this.loader.list = false;
      this.toaster.toast('error', 'Error', 'Error while fetching data.');
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
          const levelInd: any = this.hierarchyService.levels.findIndex((ele: any) => ele.id === this.hierarchyService.currentLevel?.id);
          if (levelInd > -1 && levelInd !== this.hierarchyService.levels.length-1) {
            let currenstack = this.currentHierarchyStack;
            currenstack[levelInd + 1] = event.data['hierarchy_id'];
            this.hierarchyService.currentLevel = this.hierarchyService.levels[levelInd + 1];
            this.hierarchyService.pushLevel(currenstack);
          }
          if (levelInd === this.hierarchyService.levels.length-1) {
            this.router.navigate(['/app/devices/1/assets/1']);
          }
          break;
        case 'addnew':
          this.formData = {item_values: {}};
          this.fetchLevelTemplate();
          break;
        case 'edit':
          this.fetchLevelTemplate(event.data?.hierarchy_id);
          break;
        case 'delete': 
          const message = `Are you sure you want to delete the site?`;
          this.commonPopup.triggerPopup('deletion', 'Confirm Deletion', message, true, 'deleteHiearchyItem', event);
          break;
      }
    } catch (aggridErr) {
      console.error(aggridErr);
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

  fetchLevelTemplate(hierarchy_id?: any) {
    try {
      const templatePayload: any = {
        template_id: this.currentHierarchyLevel.template_id
      };
      this.loader['fetch'] = true;
      this.appservice.fetchLevelTemplate(templatePayload).pipe(takeUntil(this.destroy$)).subscribe((fetchLevRes: any) => {
        if (fetchLevRes && fetchLevRes['status'] === 'success') {
          this.formConfig = fetchLevRes['data'];
          if (hierarchy_id) {
            this.fetchHierarchyItem(hierarchy_id);
          } else {
            this.loader['fetch'] = false;
            this.openModal('hierarchyModalBtn');
          }
        } else {
          this.loader['fetch'] = false;
          this.toaster.toast('error', 'Error', fetchLevRes['message'] || 'Failed to fetch data.', true);
        }
      }, (listError) => {
        console.error(listError);
        this.loader['fetch'] = false;
        this.toaster.toast('error', 'Error', 'Failed to fetch data.', true);
      });
    } catch (tempErr) {
      this.loader['fetch'] = false;
      this.toaster.toast('error', 'Error', 'Failed to fetch data.', true);
      console.error(tempErr);
    }
  }

  fetchHierarchyItem(hierarchy_id) {
    try {
      const fetchPayload: any = {
        hierarchy_id: hierarchy_id
      };
      this.appservice.fetchHierarchyItem(fetchPayload).pipe(takeUntil(this.destroy$)).subscribe((fetchHierarchyItemRes: any) => {
        if (fetchHierarchyItemRes && fetchHierarchyItemRes['status'] === 'success') {
          this.formData = fetchHierarchyItemRes['data'] || {item_values: {}};
          this.loader['fetch'] = false;
          this.openModal('hierarchyModalBtn');
        } else {
          this.loader['fetch'] = false;
          this.toaster.toast('error', 'Error', fetchHierarchyItemRes['message'] || 'Failed to fetch data.', true);
        }
      }, (listError) => {
        console.error(listError);
        this.loader['fetch'] = false;
        this.toaster.toast('error', 'Error', 'Failed to fetch data.', true);
      });
    } catch (tempErr) {
      this.loader['fetch'] = false;
      this.toaster.toast('error', 'Error', 'Failed to fetch data.', true);
      console.error(tempErr);
    }
  }

  getParentID(currLevel) {
    try {
      const ind = this.hierarchyLevels.findIndex((ele: any) => ele.id === currLevel.id);
      if (ind > -1) {
        const hierarchyId: any = this.currentHierarchyStack[ind] || null;
        return ind > 0 ? hierarchyId : null;
      }
      return null;
    } catch (parentErr) {
      console.error(parentErr);
      return null;
    }
  }

  closeForm() {
    this.formConfig = {};
    this.formData = {item_values: {}};
    this.formConfig = { ...this.formConfig };
    this.formData = { ...this.formData };
  }

  formSubmitEmitter(event) {
    let formPayload = {}
    let serviceCallName = 'createHierarchyItem';
    if (this.formData?.hierarchy_id) {
      serviceCallName = 'updateHierarchyItem'
      formPayload['hierarchy_id'] = this.formData.hierarchy_id;
    }
    try {
      formPayload = {
        ...formPayload,
        "level_id": this.currentHierarchyLevel?.id,
        "parent_id": this.getParentID(this.currentHierarchyLevel),
        "item_values": event
      };
      this.loader['conf'] = true;
      this.appservice[serviceCallName](formPayload).pipe(takeUntil(this.destroy$)).subscribe((formSubRes: any) => {
        if (formSubRes && formSubRes['status'] === 'success') {
          this.formData = {item_values: {}};
          this.openModal('closeSiteBtn');
          this.loadData({parent_id: formPayload['parent_id']})
          this.toaster.toast('success', 'Success', formSubRes['message'] || `Hierarchy item ${formPayload['hierarchy_id'] ? 'updated' : 'saved'} successsfully.`, true);
          this.loader['conf'] = false;
        } else {
          this.loader['conf'] = false;
          this.toaster.toast('error', 'Error', formSubRes['message'] || `Failed to ${formPayload['hierarchy_id'] ? 'update' : 'save'} the data.`, true);
        }
      }, (listError) => {
        console.error(listError);
        this.loader['conf'] = false;
        this.toaster.toast('error', 'Error', `Failed to ${formPayload['hierarchy_id'] ? 'update' : 'save'} the data.`, true);
      });
    } catch (event) {
      this.loader['conf'] = true;
      this.toaster.toast('error', 'Error', `Failed to ${formPayload['hierarchy_id'] ? 'update' : 'save'} the data.`, true);
      console.error(event);
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

  deleteHiearchyItem(data: any) {
    try {
      const deletePayload: any = {
        hierarchy_id: data.data.hierarchy_id
      }
      this.loader['delete'] = true;
      this.appservice.deleteHierarchyItem(deletePayload).pipe(takeUntil(this.destroy$)).subscribe((delRes: any) => {
        if (delRes && delRes['status'] === 'success') {
          this.loader['delete'] = false;
          this.toaster.toast('success', 'Success', delRes['message'] || `Hierarchy item deleted successfully.`, true);
          this.loadData({parent_id: this.getParentID(this.currentHierarchyLevel)});
        } else {
          this.loader['delete'] = false;
          this.toaster.toast('error', 'Error', delRes['message'] || 'Failed to delete the hierarchy item.', true);
        }
      }, (listError) => {
        console.error(listError);
        this.loader['delete'] = false;
        this.toaster.toast('error', 'Error', 'Failed to delete the hierarchy item.', true);
      });
    } catch (delErr) {
      this.loader['delete'] = false;
      console.error(delErr);
      this.toaster.toast('error', 'Error', 'Failed to delete the hierarchy item.', true);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

