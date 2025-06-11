import { Component } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Smartphone {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-smartphones',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, CurrencyPipe],
  templateUrl: './smartphones.component.html',
  styleUrl: './smartphones.component.scss'
})
export class SmartphonesComponent {
  smartphones$: Observable<Smartphone[]>;
  currentIndex = 0;
  readonly itemsPerPage = 3;

  constructor(private readonly http: HttpClient) {
    this.smartphones$ = this.http.get<any>('https://dummyjson.com/products/category/smartphones').pipe(
      map(response => (response?.products ?? []).map((item: any) => ({
        id: item.id,
        nombre: item.title,
        marca: item.brand,
        descripcion: item.description,
        precio: item.price * 4000, // Aproximación a ARS
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
