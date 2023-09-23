import { Component } from '@angular/core';
import { ArticulosService } from 'src/app/SERVIDOR/articulos.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent {
  productoNombre: string = '';
  camaraActivada: boolean = false;
  productos: any[] = [];
  sumaPrecios: number = 0;

  constructor(private articulosService: ArticulosService) { }

  agregarProducto(codigoBarras: string | null = null): void {
    let nombreProducto = this.productoNombre;

    if (codigoBarras) {
      // Si se proporciona un código de barras, usarlo como nombre del producto
      nombreProducto = codigoBarras;
    }

    if (nombreProducto.trim() === '') {
      alert('Por favor, ingrese un nombre o código de producto válido.');
      return;
    }

    // Buscar si el producto ya existe en la lista por nombre o código
    const productoExistente = this.productos.find(producto => producto.nombre === nombreProducto || producto.codigo === nombreProducto);

    if (productoExistente) {
      // Si el producto existe, incrementar la cantidad y recalcular la suma de precios
      productoExistente.cantidad++;
      this.calcularSumaPrecios();
    } else {
      // Si el producto no existe, llamar al servicio para validar y agregar
      this.articulosService.validarProducto(nombreProducto)
        .subscribe(
          (data) => {
            // Maneja la respuesta del servidor aquí
            if (data.length > 0) {
              const producto = data[0];
              producto.cantidad = 1; // Inicializar la cantidad en 1
              this.productos.push(producto);
              this.calcularSumaPrecios(); // Recalcular la suma de precios
            } else {
              // El producto no existe
              alert('El producto no fue encontrado en la base de datos.');
            }

            this.productoNombre = ''; // Limpia el campo de entrada
          },
          (error) => {
            console.error('Error al validar el producto:', error);
          }
        );
    }
  }

  // Restar cantidad de un producto
  restarCantidad(producto: any): void {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      // Eliminar el producto si la cantidad es 1 o menos
      const index = this.productos.indexOf(producto);
      if (index !== -1) {
        this.productos.splice(index, 1);
      }
    }

    // Recalcular la suma de precios automáticamente
    this.calcularSumaPrecios();
  }

  calcularSumaPrecios(): void {
    this.sumaPrecios = this.productos.reduce((total, producto) => total + (parseFloat(producto.precio) * producto.cantidad), 0);
  }

  activarCamara(): void {
    // Implementa la lógica para activar la cámara web aquí
    this.camaraActivada = true;
  }

  onCodigoBarrasDetectado(codigoBarras: string) {
    this.agregarProducto(codigoBarras);
  }
}
