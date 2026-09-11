import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rastrear } from './rastrear';

describe('Rastrear', () => {
  let component: Rastrear;
  let fixture: ComponentFixture<Rastrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rastrear],
    }).compileComponents();

    fixture = TestBed.createComponent(Rastrear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
