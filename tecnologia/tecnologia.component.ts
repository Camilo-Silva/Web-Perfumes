import { Component } from '@angular/core';
import { LaptopsComponent } from '../laptops/laptops.component';
import { SmartphonesComponent } from '../smartphones/smartphones.component';

@Component({
  selector: 'app-tecnologia',
  standalone: true,
  imports: [LaptopsComponent, SmartphonesComponent],
  templateUrl: './tecnologia.component.html',
  styleUrl: './tecnologia.component.scss'
})
export class TecnologiaComponent {}
