import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tarifa } from './pages/tarifa/tarifa';
import { Rastrear } from './pages/rastrear/rastrear';
import { Oficinas } from './pages/oficinas/oficinas';
import { Dashboard } from './pages/dashboard/dashboard';
import { Provincias } from './pages/dashboard/provincias/provincias';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';
import { GestionarOficinas } from './pages/dashboard/oficinas/oficinas';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cotizar', component: Tarifa },
  { path: 'rastrear', component: Rastrear },
  { path: 'oficinas', component: Oficinas},
  { path: 'login', component:Login},
  {
  path: 'dashboard',
  canActivate: [authGuard],
  children: [
    { path: '', component: Dashboard },
    { path: 'provincias', component: Provincias },
    { path: 'oficinasdash', component:    GestionarOficinas}
  ]
}
];