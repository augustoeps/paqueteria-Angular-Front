import { TestBed } from '@angular/core/testing';
import { HistorialEstado } from './historial-estado';

describe('HistorialEstado', () => {
  let service: HistorialEstado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialEstado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
