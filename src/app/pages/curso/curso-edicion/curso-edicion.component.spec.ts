import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEdicionComponent } from './curso-edicion.component';

describe('CursoEdicionComponent', () => {
  let component: CursoEdicionComponent;
  let fixture: ComponentFixture<CursoEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
