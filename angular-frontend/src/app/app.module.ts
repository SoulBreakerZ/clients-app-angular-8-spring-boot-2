import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EjemploForComponent } from './components/ejemplo-for/ejemplo-for.component';
import { EjemploIfComponent } from './components/ejemplo-if/ejemplo-if.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsJsonDataComponent } from './components/clients-json-data/clients.json.data.component';
import { ClientService } from './services/client.service';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FormComponent } from './components/clients/form.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EjemploForComponent,
    EjemploIfComponent,
    ClientsComponent,
    ClientsJsonDataComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ModalModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [ClientService, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeES, 'es');
  }
}
