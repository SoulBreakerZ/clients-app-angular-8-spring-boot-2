import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsJsonDataComponent } from './components/clients-json-data/clients.json.data.component';
import { ClientsComponent } from './components/clients/clients.component';
import { EjemploIfComponent } from './components/ejemplo-if/ejemplo-if.component';
import { EjemploForComponent } from './components/ejemplo-for/ejemplo-for.component';
import { FormComponent } from './components/clients/form.component';


const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients-json-data', component: ClientsJsonDataComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/form', component: FormComponent },
  { path: 'clients/form/:id', component: FormComponent },
  { path: 'ejemploif', component: EjemploIfComponent },
  { path: 'ejemplofor', component: EjemploForComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
