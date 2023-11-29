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
    path: 'encomendas',
    loadChildren: () => import('./views/encomenda/encomenda.module').then(m => m.EncomendaModule)
  },
  {
    path: 'operacoes',
    loadChildren: () => import('./views/operacoes/operacoes.module').then(m => m.OperacoesModule)
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./views/relatorios/relatorios.module').then(m => m.RelatoriosModule)
  },
  {
    path: 'configuracao',
    loadChildren: () => import('./views/configuracao/configuration.module').then(m => m.ConfigurationModule)
  },
  { path: 'facturacaos', loadChildren: () => import('./views/facturacaos/facturacaos.module').then(m => m.FacturacaosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
