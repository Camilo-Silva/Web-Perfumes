import { Component } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, CurrencyPipe } from '@angular/common';
import { PerfumesService, Perfume } from '../../services/perfumes.service';
import { Observable } from 'rxjs';
import { SunglassesComponent } from '../sunglasses/sunglasses.component';

@Component({
  selector: 'app-perfume',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, CurrencyPipe, SunglassesComponent],
  templateUrl: './perfume.component.html',
  styleUrl: './perfume.component.scss'
})
export class PerfumeComponent {
  perfumes$: Observable<Perfume[]>;
  currentIndex = 0;
  readonly itemsPerPage = 3;

  constructor(private readonly perfumesService: PerfumesService) {
    this.perfumes$ = this.perfumesService.getPerfumes();
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
