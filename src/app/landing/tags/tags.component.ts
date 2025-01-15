import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'wt-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  tagForm: FormGroup;
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
      field: 'tag_name', 
      headerName: 'Tag Name', 
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
    this.tagForm = this.fb.group({
      tag_name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchTags();
  }

  // Fetch tags data
  fetchTags(): void {
    this.loader = true;
    this.appService
      .fetchTags()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.rowData = data.tags || [];
          this.loader = false;
        },
        error: (err) => {
          console.error('Error fetching tags:', err);
          this.loader = false;
        }
      });
  }

  // Create a new tag
  createTag(): void {
    if (this.tagForm.invalid) return;

    const payload = { tag_name: this.tagForm.value.tag_name };
    this.loader = true;

    this.appService
      .createTag(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.tagForm.reset();
          this.fetchTags();
        },
        error: (err) => {
          console.error('Error creating tag:', err);
          this.loader = false;
        }
      });
  }

  // Handle selection change
  onSelectionChanged(event: any): void {
    this.selectedRows = this.gridApi.getSelectedRows();
  }

  // Delete selected tags
  deleteTags(): void {
    const idsToDelete = this.selectedRows.map((row) => row.id);
    if (idsToDelete.length === 0) return;

    this.loader = true;

    this.appService
      .deleteTags({ ids: idsToDelete })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.selectedRows = [];
          this.fetchTags();
        },
        error: (err) => {
          console.error('Error deleting tags:', err);
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
