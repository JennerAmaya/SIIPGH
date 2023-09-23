import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './MODULOS/productos/productos.component';
import { CajaComponent } from './MODULOS/caja/caja.component';
import { CamaraComponent } from './MODULOS/caja/camara/camara.component';

const routes: Routes = [
  {path: 'productos', component: ProductosComponent},
  {path:  'caja', component: CajaComponent},
  {path: 'camara', component: CamaraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
