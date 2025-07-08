import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { CategoriasComponent } from './categorias/categorias.component';
import { ConfigurationComponent } from './configuration.component';
import { FormasPagamentoComponent } from './formas-pagamento/formas-pagamento.component';
import { ImpostoComponent } from './imposto/imposto.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { TiposProdutoComponent } from './tipos-produto/tipos-produto.component';

import { CreateOrEditCategoriasComponent } from './categorias/create-or-edit-categorias/create-or-edit-categorias.component';
import { CreateOrEditFormasPagamentoComponent } from './formas-pagamento/create-or-edit-formas-pagamento/create-or-edit-formas-pagamento.component';
import { CreateOrEditImpostoComponent } from './imposto/create-or-edit-imposto/create-or-edit-imposto.component';
import { CreateOrEditMunicipiosComponent } from './municipios/create-or-edit-municipios/create-or-edit-municipios.component';
import { CreateOrEditTiposProdutoComponent } from './tipos-produto/create-or-edit-tipos-produto/create-or-edit-tipos-produto.component';
import { LayoutModule } from '../layout/layout.module';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { CreatOrEditProvinciasComponent } from './provincias/creat-or-edit-provincias/creat-or-edit-provincias.component';
import { CreateOrEditConfigurationComponent } from './create-or-edit-configuration/create-or-edit-configuration.component';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyComponent } from '../company/company.component';
import { AssociarContaComponent } from '../company/associar-conta/associar-conta.component';
import { DistritosComponent } from './distritos/distritos.component';
import { CreateOrEditDistritoComponent } from './distritos/create-or-edit-distrito/create-or-edit-distrito.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { CreateOrEditUsersComponent } from './users/create-or-edit-users/create-or-edit-users.component';
import { CreateOrEditRolesComponent } from './roles/create-or-edit-roles/create-or-edit-roles.component';
import { CreateOrEditPermissionsComponent } from './permissions/create-or-edit-permissions/create-or-edit-permissions.component';
import { PermissionsComponent } from './permissions/permissions.component';


@NgModule({
  declarations: [
    RolesComponent,
    CreateOrEditRolesComponent,
    PermissionsComponent,
    CreateOrEditPermissionsComponent,
    UsersComponent,
    CreateOrEditUsersComponent,
    CategoriasComponent,
    ConfigurationComponent,
    FormasPagamentoComponent,
    ImpostoComponent,
    MunicipiosComponent,
    ProvinciasComponent,
    TiposProdutoComponent,
    DistritosComponent,
    CompanyComponent,
    AssociarContaComponent,
    CreateOrEditDistritoComponent,
    CreateOrEditCategoriasComponent,
    CreateOrEditFormasPagamentoComponent,
    CreateOrEditImpostoComponent,
    CreateOrEditMunicipiosComponent,
    CreateOrEditTiposProdutoComponent,
    CreatOrEditProvinciasComponent,
    CreateOrEditConfigurationComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ConfigurationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    TranslateModule.forChild(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.pulse,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
  ]
})
export class ConfigurationModule { }
