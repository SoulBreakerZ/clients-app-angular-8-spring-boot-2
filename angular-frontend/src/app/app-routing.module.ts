import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsJsonDataComponent } from './components/clients-json-data/clients.json.data.component';
import { ClientsComponent } from './components/clients/clients.component';
import { EjemploIfComponent } from './components/ejemplo-if/ejemplo-if.component';
import { EjemploForComponent } from './components/ejemplo-for/ejemplo-for.component';
import { FormComponent } from './components/clients/form.component';
import { ClientsPageComponent } from './components/clients-page/clients-page.component';
import { FormPageComponent } from './components/clients-page/form-page.component';
import { DetailsComponent } from './components/clients-page/details/details.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients-page', pathMatch: 'full' },
  { path: 'clients-json-data', component: ClientsJsonDataComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/form', component: FormComponent },
  { path: 'clients/form/:id', component: FormComponent },
  { path: 'ejemploif', component: EjemploIfComponent },
  { path: 'ejemplofor', component: EjemploForComponent },
  { path: 'clients-page', component: ClientsPageComponent },
  { path: 'clients-page/page/:page', component: ClientsPageComponent },
  { path: 'clients-page/form-page', component: FormPageComponent },
  { path: 'clients-page/form-page/:id', component: FormPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
