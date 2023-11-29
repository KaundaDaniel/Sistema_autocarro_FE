import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArchwizardModule } from 'angular-archwizard';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { LayoutModule } from '../layout/layout.module';

import { ProdutosComponent } from './produtos.component';
import { CreateOrEditProdutoComponent } from './create-or-edit-produto/create-or-edit-produto.component';
import { IncreaseStockComponent } from './increase-stock/increase-stock.component';
import { ShareProuctOnFacebookComponent } from './share-prouct-on-facebook/share-prouct-on-facebook.component';


@NgModule({
  declarations: [
    ProdutosComponent,
    CreateOrEditProdutoComponent,
    IncreaseStockComponent,
    ShareProuctOnFacebookComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ProdutoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ArchwizardModule,
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
export class ProdutoModule { }
