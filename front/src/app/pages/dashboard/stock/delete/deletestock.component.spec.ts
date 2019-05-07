import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletestockComponent } from './deletestock.component';

describe('DeletestockComponent', () => {
  let component: DeletestockComponent;
  let fixture: ComponentFixture<DeletestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
