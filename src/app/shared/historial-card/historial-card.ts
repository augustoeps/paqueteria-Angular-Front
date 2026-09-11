import { Component, Input } from '@angular/core';
import { HistorialEstado } from '../../models/historialEstado';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historial-card',
  imports: [DatePipe],
  templateUrl: './historial-card.html',
  styleUrl: './historial-card.css'
})
export class HistorialCard {
  @Input() evento!: HistorialEstado;
  @Input() esActivo: boolean = false;
}