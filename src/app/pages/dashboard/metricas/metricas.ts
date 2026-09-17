import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { MetricasService } from '../../../services/metricasService';
import { ProvinciaService } from '../../../services/provincia';
import { OficinaService } from '../../../services/oficina';
import { EstadisticasPorTipo, EstadisticasPorId } from '../../../models/metricas.model';
import { Provincia } from '../../../models/Provincia';
import { Oficina } from '../../../models/oficina';

@Component({
  selector: 'app-metricas',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './metricas.html',
  styleUrl: './metricas.css',
})
export class Metricas implements OnInit {

  private metricasService = inject(MetricasService);
  private provinciaService = inject(ProvinciaService);
  private oficinaService = inject(OficinaService);

  protected estadisticasPorTipo = signal<EstadisticasPorTipo>({});
  protected ingresosTotales = signal<number>(0);
  protected estadisticasPorProvincia = signal<EstadisticasPorId>({});
  protected estadisticasPorOficina = signal<EstadisticasPorId>({});

  protected provincias = signal<Provincia[]>([]);
  protected oficinas = signal<Oficina[]>([]);

  ngOnInit(): void {
    this.metricasService.porTipo().subscribe(r => this.estadisticasPorTipo.set(r));
    this.metricasService.ingresosTotales().subscribe(r => this.ingresosTotales.set(r));
    this.metricasService.porProvincia().subscribe(r => this.estadisticasPorProvincia.set(r));
    this.metricasService.porOficina().subscribe(r => this.estadisticasPorOficina.set(r));
    this.provinciaService.findAll().subscribe(r => this.provincias.set(r));
    this.oficinaService.findAllOficinas().subscribe(r => this.oficinas.set(r));
  }

  nombreProvincia(id: string): string {
    return this.provincias().find(p => p.id === id)?.nombre ?? id;
  }

  nombreOficina(id: string): string {
    return this.oficinas().find(o => o.id === id)?.nombre ?? id;
  }

  totalEventos(): number {
    return Object.values(this.estadisticasPorTipo()).reduce((acc, v) => acc + v, 0);
  }

  // --- Gráfico de dona: Paquetes por Estado ---
  chartTipoData = computed<ChartData<'doughnut'>>(() => ({
    labels: Object.keys(this.estadisticasPorTipo()),
    datasets: [{
      data: Object.values(this.estadisticasPorTipo()),
      backgroundColor: ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ef4444'],
      borderWidth: 0,
    }]
  }));

  chartTipoOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 11 } } }
    }
  };

  // --- Gráfico de barras: Paquetes por Provincia ---
  chartProvinciaData = computed<ChartData<'bar'>>(() => ({
    labels: Object.keys(this.estadisticasPorProvincia()).map(id => this.nombreProvincia(id)),
    datasets: [{
      data: Object.values(this.estadisticasPorProvincia()),
      backgroundColor: '#0ea5e9',
      borderRadius: 6,
    }]
  }));

  chartBarOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
  };

  // --- Gráfico de barras: Paquetes por Oficina ---
  chartOficinaData = computed<ChartData<'bar'>>(() => ({
    labels: Object.keys(this.estadisticasPorOficina()).map(id => this.nombreOficina(id)),
    datasets: [{
      data: Object.values(this.estadisticasPorOficina()),
      backgroundColor: '#ec4899',
      borderRadius: 6,
    }]
  }));
}