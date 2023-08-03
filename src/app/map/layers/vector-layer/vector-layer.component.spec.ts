import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorLayerComponent } from './vector-layer.component';

describe('VectorLayerComponent', () => {
  let component: VectorLayerComponent;
  let fixture: ComponentFixture<VectorLayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VectorLayerComponent]
    });
    fixture = TestBed.createComponent(VectorLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
