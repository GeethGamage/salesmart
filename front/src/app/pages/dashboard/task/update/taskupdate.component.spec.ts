import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskupdateComponent } from './taskupdate.component';

describe('TaskupdateComponent', () => {
  let component: TaskupdateComponent;
  let fixture: ComponentFixture<TaskupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
