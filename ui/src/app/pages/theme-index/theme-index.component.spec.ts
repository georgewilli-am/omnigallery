import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeIndexComponent } from './theme-index.component';

describe('ThemeIndexComponent', () => {
  let component: ThemeIndexComponent;
  let fixture: ComponentFixture<ThemeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
