import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/toastr/toaster.service';

@Component({
  selector: 'wt-hierarchy-fields',
  templateUrl: './hierarchy-fields.component.html',
  styleUrls: ['./hierarchy-fields.component.scss']
})
export class HierarchyFieldsComponent implements OnInit {

  @Input() formConfig: any = {};
  @Input() formData: any = {};
  @Input() loader: any = false;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() closeForm = new EventEmitter<any>();

  formGroup: FormGroup = new FormGroup({}); 

  constructor(private toaster: ToasterService) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formData']) {
      this.patchFormData();
    }
  }

  patchFormData() {
    if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach(key => {
        const value = this.formData?.[key] ?? '';
        this.formGroup.controls[key].patchValue(value);
      });
    }
  }
  

  buildForm() {
    try {
      if (!this.formConfig?.data?.length) { return; }
      const groupControls: { [key: string]: FormControl } = {};
  
      this.formConfig.data.forEach(section => {
        section.fields.forEach(field => {
          const validators = field.required ? [Validators.required] : [];
          const value = this.formData[field.key] ?? '';
          groupControls[field.key] = new FormControl(value, validators);
        });
      });
  
      this.formGroup = new FormGroup(groupControls);
    } catch (buildFormErr) {
      console.error(buildFormErr);
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

  submit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    } else {
      this.validateAllFormFields(this.formGroup);
      this.toaster.toast('warning', 'Warning', 'Please fill all the required fields.', true);
      return;
    }
  }

  openModal(id: any) {
    try {
      const DOMELE: HTMLElement | null = document.getElementById(id);
      DOMELE?.click();
    } catch (idErr) {
      console.error(idErr);
    }
  }

  closeFormModal() {
    this.closeForm.emit();
  }

  ngOnDestroy() {
    // Clean up the form
    this.formGroup.reset();         // Reset the values
    this.formGroup.disable();       // Disable all controls (optional)
    (this.formGroup as any) = null; // Explicitly dereference (optional)
  }

}
