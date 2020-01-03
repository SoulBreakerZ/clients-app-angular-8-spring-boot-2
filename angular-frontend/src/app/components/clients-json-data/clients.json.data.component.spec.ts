import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsJsonDataComponent } from './clients.json.data.component';

describe('ClientesComponent', () => {
  let component: ClientsJsonDataComponent;
  let fixture: ComponentFixture<ClientsJsonDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsJsonDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsJsonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
