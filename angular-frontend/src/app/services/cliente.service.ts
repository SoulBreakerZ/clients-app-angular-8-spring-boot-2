import { Injectable } from '@angular/core';
import { CLIENTES } from '../seeder/clientes.json';
import { Cliente } from '../models/cliente';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientesByJsonFile(): Cliente[] {
    return CLIENTES;
  }

  getClientesObservableByJsonFile(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
