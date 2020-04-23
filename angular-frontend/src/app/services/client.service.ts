import { Injectable } from '@angular/core';
import { CLIENTS } from '../seeder/clientes.json.js';
import { Client } from '../models/client';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Page } from '../models/page';
import { Region } from '../models/region';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private urlEndPoint: string = 'http://localhost:8080/api/client';

  constructor(private http: HttpClient, private toastrService: ToastrService, private router: Router, private authService: AuthService) { }

  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isAuthorized(e): boolean {
    if (e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/auth/login']);
      return true;
    }

    if (e.status == 403) {
      this.toastrService.error(`Hello ${this.authService.user.username} you can't access this resource`, 'Access Denied');
      this.router.navigate(['/clients-page']);
      return true;
    }
    return false;
  }

  getClientsByJsonFile(): Client[] {
    return CLIENTS;
  }

  getClientsObservableByJsonFile(): Observable<Client[]> {
    return of(CLIENTS);
  }

  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlEndPoint).pipe(
      // tap(response => {
      //   console.log('ClientService: tap 1');
      //   (response as Client[]).forEach(client => {
      //     console.log(client.name);
      //   });
      // }),
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
      // tap(response => {
      //   console.log('ClientService: tap 2');
      //   (response).forEach(client => {
      //     console.log(client.name);
      //   });
      // })
    );
  }

  findAllPageable(page: number): Observable<Page<Client>> {
    return this.http.get<Page<Client>>(`${this.urlEndPoint}/page/${page}`).pipe(
      // tap(response => {
      //   console.log('ClientService: tap 1');
      //   (response.content as Client[]).forEach(client => {
      //     console.log(client.name);
      //   });
      // }),
      map(response => {
        const page = response as Page<Client>;
        page.content.map(client => {
          client.name = client.name.toUpperCase();
          //client.createdDate = formatDate(client.createdDate, 'dd/MM/yyyy', 'en-US');
          //client.createdDate = formatDate(client.createdDate, 'EEEE dd, MMMM yyyy', 'es');
          //client.createdDate = formatDate(client.createdDate, 'fullDate', 'es');
          //client.createdDate = new DatePipe('en-US').transform(client.createdDate,'dd/MM/yyyy');
          return client;
        });
        return page;
      }),
    );
  }

  findById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {

        if (this.isAuthorized(e)) {
          return throwError(e);
        }

        this.router.navigate(['/clients-page']);
        console.error(e.error.message);
        this.toastrService.error(`Client operation in backend with error: ${e.error.message}`, 'Find By ID operation');
        return throwError(e);
      }))
      ;
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client, { headers: this.addAuthorizationHeader() })
      .pipe(
        map((response: any) => response as Client),
        catchError(e => {

          if (this.isAuthorized(e)) {
            return throwError(e);
          }

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
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client, { headers: this.addAuthorizationHeader() })
      .pipe(catchError(e => {

        if (this.isAuthorized(e)) {
          return throwError(e);
        }

        if (e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.message);
        this.toastrService.error(`Client operation in backend with error: ${e.error.message},${e.error.error}`, 'Update operation');
        return throwError(e);
      }));
  }

  deleteById(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`, { headers: this.addAuthorizationHeader() })
      .pipe(catchError(e => {

        if (this.isAuthorized(e)) {
          return throwError(e);
        }

        console.error(e.error.message);
        this.toastrService.error(`Client operation in backend with error: ${e.error.message},${e.error.error}`, 'Delete operation');
        return throwError(e);
      }));
  }

  uploadImage(file: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    let httpHeaders = new HttpHeaders();
    const token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload/`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req)
      .pipe(
        catchError(e => {
          this.isAuthorized(e);
          return throwError(e);
        })
      );

    // pipe(
    //   map((response: any) => response.client as Client),
    //   catchError(e => {

    //     if (e.status === 400) {
    //       return throwError(e);
    //     }

    //     console.error(e.error.message);
    //     this.toastrService.error(`Backend with error: ${e.error.message},${e.error.error}`, 'Upload image client operation');
    //     return throwError(e);
    //   })
    // );
  }


  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/region', { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        this.isAuthorized(e);
        return throwError(e);
      })
    );
  }

}
