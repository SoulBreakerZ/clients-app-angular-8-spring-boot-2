import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EjemploIfComponent } from './components/ejemplo-if/ejemplo-if.component';
import { EjemploForComponent } from './components/ejemplo-for/ejemplo-for.component';

const routes: Routes = [
  {path: '',redirectTo: '/clientes',pathMatch:'full'},
  {path: 'clientes' ,component:ClientesComponent},
  {path: 'ejemploif' ,component:EjemploIfComponent},
  {path: 'ejemplofor' ,component:EjemploForComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
