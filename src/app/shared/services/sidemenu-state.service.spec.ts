import { TestBed } from '@angular/core/testing';

import { SidemenuStateService } from './sidemenu-state.service';

describe('SidemenuStateService', () => {
  let service: SidemenuStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidemenuStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
