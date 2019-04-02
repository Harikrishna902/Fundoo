import { TestBed } from '@angular/core/testing';

import { EditlabelService } from './editlabel.service';

describe('EditlabelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditlabelService = TestBed.get(EditlabelService);
    expect(service).toBeTruthy();
  });
});
