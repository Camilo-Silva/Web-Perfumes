import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Perfume {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})
export class PerfumesService {
  private readonly apiUrl = 'https://dummyjson.com/products/category/fragrances';

  constructor(private readonly http: HttpClient) {}

  getPerfumes(): Observable<Perfume[]> {
    return this.http.get<any>('https://dummyjson.com/products?limit=30&skip=0').pipe(
      map(response => (response?.products ?? [])
        .filter((item: any) =>
          item.category === 'fragrances' ||
          item.category === 'laptops' ||
          item.category === 'smartphones' ||
          item.category === 'sunglasses'
        )
        .map((item: any) => ({
          id: item.id,
          nombre: item.title,
          marca: item.brand,
          descripcion: item.description,
          precio: item.price * 4000, // Aproximación a COP
          imagen: item.thumbnail
        }))
      )
    );
  }

  getPerfumeById(id: number): Observable<Perfume | undefined> {
    return this.getPerfumes().pipe(
      map(perfumes => perfumes.find(p => p.id === id))
    );
  }
}
