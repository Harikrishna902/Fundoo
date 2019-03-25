import { TestBed } from '@angular/core/testing';

import { searchService } from './search.service';

describe('SearchserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: searchService = TestBed.get(searchService);
    expect(service).toBeTruthy();
  });
});
