import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiFieldsetComponent } from './multi-fieldset.component';

xdescribe('MultiFieldsetComponent', () => {
  let component: MultiFieldsetComponent;
  let fixture: ComponentFixture<MultiFieldsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiFieldsetComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
