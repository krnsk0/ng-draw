import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerModalComponent } from './color-picker-modal.component';

describe('ColorPickerModalComponent', () => {
  let component: ColorPickerModalComponent;
  let fixture: ComponentFixture<ColorPickerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPickerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
