import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagination2Component } from './pagination.component';

describe('PaginationComponent', () => {
  let component: Pagination2Component;
  let fixture: ComponentFixture<Pagination2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagination2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pagination2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
