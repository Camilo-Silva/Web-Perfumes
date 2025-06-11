import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { PerfumeComponent } from "../perfume/perfume.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NgIf, PerfumeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private readonly router: Router) {}

  get isTecnologia(): boolean {
    return this.router.url.startsWith('/tecnologia');
  }

  goToTecnologia() {
    this.router.navigate(['/tecnologia']);
  }

  goToPerfumes() {
    this.router.navigate(['/']);
  }
}
