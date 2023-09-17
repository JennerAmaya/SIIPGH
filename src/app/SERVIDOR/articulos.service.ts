import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  url='http://localhost/SIIP/PHPapi/'; // disponer url de su servidor que tiene las páginas PHP
  seleccionar: any;

  constructor(private http: HttpClient) { }

  Todoslosproductos() {
    return this.http.get(`${this.url}todoslosproductos.php`);
  }
  
}