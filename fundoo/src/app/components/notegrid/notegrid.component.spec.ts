import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotegridComponent } from './notegrid.component';

describe('NotegridComponent', () => {
  let component: NotegridComponent;
  let fixture: ComponentFixture<NotegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
