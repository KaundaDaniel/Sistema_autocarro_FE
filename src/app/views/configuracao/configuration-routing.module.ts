import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from '../company/company.component';
import { DistritosComponent } from './distritos/distritos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ConfigurationComponent } from './configuration.component';
import { FormasPagamentoComponent } from './formas-pagamento/formas-pagamento.component';
import { ImpostoComponent } from './imposto/imposto.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { TiposProdutoComponent } from './tipos-produto/tipos-produto.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [
  { path: "empresa", component: CompanyComponent },
  { path: 'sistema', component: ConfigurationComponent },
  { path: 'imposto', component: ImpostoComponent },
  { path: 'categorias-produto', component: CategoriasComponent },
  { path: 'tipos-produto', component: TiposProdutoComponent },
  { path: 'formas-pagamento', component: FormasPagamentoComponent },
  { path: 'provincias', component: ProvinciasComponent },
  { path: 'municipios', component: MunicipiosComponent },
  { path: 'distrito', component: DistritosComponent },
  { path: 'utilizadores', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'permissions', component: PermissionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
