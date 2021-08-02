import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCarroComponent } from './novo-carro.component';

describe('NovoCarroComponent', () => {
  let component: NovoCarroComponent;
  let fixture: ComponentFixture<NovoCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoCarroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
