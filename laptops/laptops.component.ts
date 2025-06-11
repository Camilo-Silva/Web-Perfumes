import { Component } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SmartphonesComponent } from "../smartphones/smartphones.component";

interface Laptop {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-laptops',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, CurrencyPipe, SmartphonesComponent],
  templateUrl: './laptops.component.html',
  styleUrl: './laptops.component.scss'
})
export class LaptopsComponent {
  laptops$: Observable<Laptop[]>;
  currentIndex = 0;
  readonly itemsPerPage = 3;

  constructor(private readonly http: HttpClient) {
    this.laptops$ = this.http.get<any>('https://dummyjson.com/products/category/laptops').pipe(
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
