import { Component } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Producto {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-sunglasses',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, CurrencyPipe],
  templateUrl: './sunglasses.component.html',
  styleUrl: './sunglasses.component.scss'
})
export class SunglassesComponent {
  productos$: Observable<Producto[]>;
  currentIndex = 0;
  readonly itemsPerPage = 3;

  constructor(private readonly http: HttpClient) {
    this.productos$ = this.http.get<any>('https://dummyjson.com/products/category/sunglasses').pipe(
      map(response => (response?.products ?? []).map((item: any) => ({
        id: item.id,
        nombre: item.title,
        marca: item.brand,
        descripcion: item.description,
        precio: item.price * 1000, // Aproximación a ARS
        imagen: item.thumbnail
      })))
    );
  }

  next(total: number) {
    if (this.currentIndex + this.itemsPerPage < total) {
      this.currentIndex += this.itemsPerPage;
    }
  }

  prev() {
    if (this.currentIndex - this.itemsPerPage >= 0) {
      this.currentIndex -= this.itemsPerPage;
    }
  }
}
