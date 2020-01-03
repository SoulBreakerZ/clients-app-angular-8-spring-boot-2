import { Injectable } from '@angular/core';
import { CLIENTS } from '../seeder/clientes.json.js';
import { Client } from '../models/client';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private urlEndPoint: string = 'http://localhost:8080/api/client';


  constructor(private http: HttpClient, private toastrService: ToastrService, private router: Router) {
  }

  getClientsByJsonFile(): Client[] {
    return CLIENTS;
  }

  getClientsObservableByJsonFile(): Observable<Client[]> {
    return of(CLIENTS);
  }

  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlEndPoint).pipe(
      tap(response  => {
        console.log('ClientService: tap 1');
        (response as Client[]).forEach(client => {
          console.log(client.name);
        });
      }),
      map(response =>
        (response as Client[]).map(client => {
          client.name = client.name.toUpperCase();
          //client.createdDate = formatDate(client.createdDate, 'dd/MM/yyyy', 'en-US');
          //client.createdDate = formatDate(client.createdDate, 'EEEE dd, MMMM yyyy', 'es');
          //client.createdDate = formatDate(client.createdDate, 'fullDate', 'es');
          //client.createdDate = new DatePipe('en-US').transform(client.createdDate,'dd/MM/yyyy');
          return client;
        })
      ),
      tap(response => {
        console.log('ClientService: tap 2');
        (response).forEach(client => {
          console.log(client.name);
        });
      }),
    );
  }

  findById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`)
      .pipe(catchError(e => {
        this.router.navigate(['/clients']);
        console.error(e.error.message);
        this.toastrService.error(`Client operation in backend with error: ${e.error.message}`, 'Delete operation');
        return throwError(e);
      }))
      ;
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response as Client),
        catchError(e => {

          if (e.status === 400) {
            return throwError(e);
          }

          console.error(e.error.message);
          this.toastrService.error(`Client operation in backend with error: ${e.error.message},${e.error.error}`, 'Create operation');
          return throwError(e);
        })
      );
  }

  update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client, { headers: this.httpHeaders })
      .pipe(catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.message);
        this.toastrService.error(`Client operation in backend with error: ${e.error.message},${e.error.error}`, 'Update operation');
        return throwError(e);
      }));
  }

  deleteById(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`)
      .pipe(catchError(e => {
        console.error(e.error.message);
        this.toastrService.error(`Client operation in backend with error: ${e.error.message},${e.error.error}`, 'Delete operation');
        return throwError(e);
      }));
  }
}
