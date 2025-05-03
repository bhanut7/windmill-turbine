import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyFieldsComponent } from './hierarchy-fields.component';

describe('HierarchyFieldsComponent', () => {
  let component: HierarchyFieldsComponent;
  let fixture: ComponentFixture<HierarchyFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchyFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierarchyFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
