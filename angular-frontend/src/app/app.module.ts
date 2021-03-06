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
import { ClientsPageComponent } from './components/clients-page/clients-page.component';
import { ClientService } from './services/client.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FormComponent } from './components/clients/form.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FormPageComponent } from './components/clients-page/form-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { DetailsComponent } from './components/clients-page/details/details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TokenInterceptor } from './http/token.interceptor';
import { AuthInterceptor } from './http/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EjemploForComponent,
    EjemploIfComponent,
    ClientsJsonDataComponent,
    ClientsComponent,
    FormComponent,
    ClientsPageComponent,
    FormPageComponent,
    PaginatorComponent,
    DetailsComponent,
    LoginComponent
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
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [ClientService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [DetailsComponent]
})
export class AppModule {
  constructor(private localeService: BsLocaleService) {
    registerLocaleData(localeES, 'es');
    this.localeService.use('es');
    defineLocale('es', esLocale);
  }
}
