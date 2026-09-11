import { Component, OnInit, signal, inject } from '@angular/core';
import { ProvinciaService } from '../../services/provincia';
import { Provincia } from '../../models/Provincia';
import { TarifaService } from '../../services/tarifa';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-tarifa',
  styleUrl: './tarifa.css',
  templateUrl: './tarifa.html',
})
export class Tarifa implements OnInit  {

  private provinciaService = inject(ProvinciaService);
  private tarifaService = inject(TarifaService);

  //Lista de provincias que vienen del backend
  protected provincias = signal<Provincia[]>([]);
  
  //Precio cotizado de esa ruta
  protected precioCotizado = signal<number>(-1);

  //Las variables del formulario que enviaremos al backend
  protected provinciaOrigenSeleccionada = signal<string>('');
  protected provinciaDestinoSeleccionada = signal<string>('');
  protected pesoIngresado = signal<number | null>(null);

  ngOnInit(): void {
    this.provinciaService.findAll().subscribe(resultado => {
      this.provincias.set(resultado);

    })
  }

  cotizar(provinciaOrigen: string, provinciaDestino:string, peso:number): void{

    this.tarifaService.cotizar(provinciaOrigen,provinciaDestino,peso).subscribe(resultado => {
      this.precioCotizado.set(resultado);
    })
  }








}
