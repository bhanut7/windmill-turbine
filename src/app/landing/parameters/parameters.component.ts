import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'wt-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit, OnDestroy {
  parameterForm: FormGroup;
  rowData: any[] = [];
  columnDefs = [
    {
      headerCheckboxSelection: true, // "Select All" checkbox in the header
      checkboxSelection: true, // Checkboxes for each row
      headerName: '', // No header name for the checkbox column
      resizable: false, // Prevent resizing for this column
      filter: false,
      sortable: false,
      width: 50, // Minimal width for checkbox
      maxWidth: 50, // Ensure it doesn't grow larger than this
      minWidth: 50, // Prevent shrinking below this
      suppressSizeToFit: true,
    },
    { 
      field: 'parameter_name', 
      headerName: 'Parameter Name', 
      sortable: true, 
      filter: true, 
      flex: 1 // Allows this column to take the remaining space dynamically
    },
    { 
      field: 'description', 
      headerName: 'Description', 
      sortable: true, 
      filter: true, 
      flex: 1 // Allows this column to take the remaining space dynamically
    }
  ];
  gridApi: any; // Stores the reference to the grid API
  selectedRows: any[] = [];
  loader = false;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private appService: AppService) {
    this.parameterForm = this.fb.group({
      parameter_name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchParameters();
  }

  // Fetch tags data
  fetchParameters(): void {
    this.loader = true;
    this.appService
      .fetchParameters()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.rowData = data.parameters || [];
          this.loader = false;
        },
        error: (err) => {
          console.error('Error fetching parameters:', err);
          this.loader = false;
        }
      });
  }

  // Create a new tag
  createParameter(): void {
    if (this.parameterForm.invalid) return;

    const payload = { parameter_name: this.parameterForm.value.parameter_name, description: this.parameterForm.value.decsription };
    this.loader = true;

    this.appService
      .createParameter(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.parameterForm.reset();
          this.fetchParameters();
        },
        error: (err) => {
          console.error('Error creating parameter:', err);
          this.loader = false;
        }
      });
  }

  // Handle selection change
  onSelectionChanged(event: any): void {
    this.selectedRows = this.gridApi.getSelectedRows();
  }

  // Delete selected tags
  deleteParameters(): void {
    const idsToDelete = this.selectedRows.map((row) => row.id);
    if (idsToDelete.length === 0) return;

    this.loader = true;

    this.appService
      .deleteParameters({ ids: idsToDelete })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.selectedRows = [];
          this.fetchParameters();
        },
        error: (err) => {
          console.error('Error deleting parameters:', err);
          this.loader = false;
        }
      });
  }

  // Handle global search
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (this.gridApi) {
      this.gridApi.setQuickFilter(value);
    }
  }

  // Store grid API instance
  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  // Clean up subscriptions on component destruction
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
