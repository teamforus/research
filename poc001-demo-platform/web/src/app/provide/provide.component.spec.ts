import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideComponent } from './provide.component';

describe('ProvideComponent', () => {
  let component: ProvideComponent;
  let fixture: ComponentFixture<ProvideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
