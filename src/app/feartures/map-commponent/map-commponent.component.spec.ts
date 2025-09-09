import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCommponentComponent } from './map-commponent.component';

describe('MapCommponentComponent', () => {
  let component: MapCommponentComponent;
  let fixture: ComponentFixture<MapCommponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCommponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapCommponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
