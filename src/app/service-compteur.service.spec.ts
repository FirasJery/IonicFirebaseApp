import { TestBed } from '@angular/core/testing';

import { CompteursService } from './service-compteur.service';

describe('CompteurService', () => {
  let service: CompteursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
