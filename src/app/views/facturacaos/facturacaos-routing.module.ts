import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturacaosComponent } from './facturacaos.component';
import { RegistarFacturaComponent } from './registar-factura/registar-factura.component';

const routes: Routes = [
  { path: 'listar-facturas', component: FacturacaosComponent },
  { path: 'registar-factura', component: RegistarFacturaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacaosRoutingModule { }
