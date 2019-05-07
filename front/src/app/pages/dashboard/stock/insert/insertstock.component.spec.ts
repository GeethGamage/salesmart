import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertstockComponent } from './insertstock.component';

describe('InsertstockComponent', () => {
  let component: InsertstockComponent;
  let fixture: ComponentFixture<InsertstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
