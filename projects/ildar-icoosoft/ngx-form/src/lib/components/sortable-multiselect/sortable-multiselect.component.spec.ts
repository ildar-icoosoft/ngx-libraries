import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableMultiselectComponent } from './sortable-multiselect.component';

describe('SortableMultiselectComponent', () => {
  let component: SortableMultiselectComponent;
  let fixture: ComponentFixture<SortableMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortableMultiselectComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
