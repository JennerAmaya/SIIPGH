import { Component } from '@angular/core';
import { ArticulosService } from 'src/app/SERVIDOR/articulos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  articulos: any;

  art = {
    codigo: 0,
    descripcion: "",
    precio: 0
  }

  constructor(private articulosServicio: ArticulosService) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.articulosServicio.Todoslosproductos().subscribe((result: any) => this.articulos = result);
  }

  seleccionar(codigo: number) {
    this.articulosServicio.seleccionar(codigo).subscribe((result: any) => this.art = result[0]);
  }

  hayRegistros() {
    return this.articulos && this.articulos.length > 0;
  }
}
