import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tarifa } from './pages/tarifa/tarifa';
import { Rastrear } from './pages/rastrear/rastrear';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cotizar', component: Tarifa },
  { path: 'rastrear', component: Rastrear }
];