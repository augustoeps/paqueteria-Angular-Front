import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialCard } from './historial-card';

describe('HistorialCard', () => {
  let component: HistorialCard;
  let fixture: ComponentFixture<HistorialCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
