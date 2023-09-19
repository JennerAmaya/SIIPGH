import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './MODULOS/productos/productos.component';
import { CajaComponent } from './MODULOS/caja/caja.component';

import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './MODULOS/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    CajaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
