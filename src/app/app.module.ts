import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './MODULOS/productos/productos.component';
import { CajaComponent } from './MODULOS/caja/caja.component';

import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './MODULOS/login/login.component';

import { FormsModule } from '@angular/forms';
import { CamaraComponent } from './MODULOS/caja/camara/camara.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    CajaComponent,
    LoginComponent,
    CamaraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
