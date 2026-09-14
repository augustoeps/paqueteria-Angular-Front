import { Component, OnInit, AfterViewInit, inject, signal } from '@angular/core';
import * as L from 'leaflet';
import { OficinaService } from '../../services/oficina';
import { Oficina } from '../../models/oficina';

const iconoOficina = L.icon({
  iconUrl: 'images/paquete.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

@Component({
  imports: [],
  selector: 'app-oficinas',
  styleUrl: './oficinas.css',
  templateUrl: './oficinas.html',
})
export class Oficinas implements OnInit, AfterViewInit {

  oficinaService = inject(OficinaService);

  private mapa!: L.Map;
  protected oficinas = signal<Oficina[]>([]);

  ngOnInit(): void {
    this.oficinaService.findAllOficinas().subscribe(oficinas => {
      this.oficinas.set(oficinas);

      if (this.mapa) {
        this.pintarMarcadores();
      }
    });
  }

  ngAfterViewInit(): void {
    this.mapa = L.map('mapa').setView([40.4168, -3.7038], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    if (this.oficinas().length > 0) {
      this.pintarMarcadores();
    }
  }

  private pintarMarcadores(): void {
    this.oficinas().forEach(oficina => {
      L.marker([oficina.latitud, oficina.longitud], { icon: iconoOficina })
        .addTo(this.mapa)
        .bindPopup(`<strong>${oficina.nombre}</strong><br>${oficina.calle} ${oficina.numero}, ${oficina.ciudad}`);
    });
  }
}