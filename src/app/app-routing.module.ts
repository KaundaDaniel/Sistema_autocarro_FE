import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: 'clientes',
    loadChildren: () => import('./views/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./views/produtos/produto.module').then(m => m.ProdutoModule)
  },
  {
    path: 'operacoes',
    loadChildren: () => import('./views/operacoes/operacoes.module').then(m => m.OperacoesModule)
  },
  {
    path: 'configuracao',
    loadChildren: () => import('./views/configuracao/configuration.module').then(m => m.ConfigurationModule)
  },
  {
    path: 'processos_juridicos',
    loadChildren: () => import('./views/processos-juridicos/processos-juridicos.module').then(m => m.ProcessosJuridicosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
