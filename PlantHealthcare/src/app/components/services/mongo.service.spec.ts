import { TestBed } from '@angular/core/testing';

import { MongoService } from './mongo.service';

describe('MongoServiceService', () => {
  let service: MongoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
