import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyWrapperComponent } from './legacy-wrapper.component';

describe('LegacyWrapperComponent', () => {
  let component: LegacyWrapperComponent;
  let fixture: ComponentFixture<LegacyWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegacyWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegacyWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
