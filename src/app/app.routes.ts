import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PerfumeComponent } from './components/perfume/perfume.component';
import { SmartphonesComponent } from './components/smartphones/smartphones.component';
import { LaptopsComponent } from './components/laptops/laptops.component';
import { SunglassesComponent } from './components/sunglasses/sunglasses.component';
import { TecnologiaComponent } from './components/tecnologia/tecnologia.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: PerfumeComponent },
      { path: 'smartphones', component: SmartphonesComponent },
      { path: 'laptops', component: LaptopsComponent },
      { path: 'sunglasses', component: SunglassesComponent },
      { path: 'tecnologia', component: TecnologiaComponent },
    ]
  }
];
