import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tarifa } from './pages/tarifa/tarifa';
import { Rastrear } from './pages/rastrear/rastrear';
import { Oficinas } from './pages/oficinas/oficinas';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cotizar', component: Tarifa },
  { path: 'rastrear', component: Rastrear },
  { path: 'oficinas', component: Oficinas},
  { path: 'dashboard', component: Dashboard},
  { path: 'login', component:Login}
];