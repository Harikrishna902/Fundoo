import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlabelsComponent } from './editlabels.component';

describe('EditlabelsComponent', () => {
  let component: EditlabelsComponent;
  let fixture: ComponentFixture<EditlabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
