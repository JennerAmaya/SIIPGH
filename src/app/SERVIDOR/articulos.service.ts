import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private url = 'http://localhost/SIIP/PHPapi/';

  constructor(private http: HttpClient) { }

 
  validarProducto(nombreProducto: string): Observable<any> {
    // Realiza una solicitud HTTP GET para validar el producto por su nombre
    return this.http.get(`${this.url}validar_producto.php?nombre_producto=${nombreProducto}`);
  }


  // Función para obtener todos los productos
  Todoslosproductos() {
    return this.http.get(`${this.url}todoslosproductos.php`);
  }
  
 
}
