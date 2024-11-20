import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkShiftAssignmentComponent } from './work-shift-assignment.component';

describe('WorkShiftAssignmentComponent', () => {
  let component: WorkShiftAssignmentComponent;
  let fixture: ComponentFixture<WorkShiftAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkShiftAssignmentComponent]
    });
    fixture = TestBed.createComponent(WorkShiftAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
