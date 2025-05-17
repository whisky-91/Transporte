import { tarifas } from "./tarifas";
import { Transporte } from "./Transporte";

export class Maritimo extends Transporte {
  pesoMax: number = Infinity; // Sin límite
  peso: number;
  precioKg: number = tarifas.KgMarino;
  precioKm: number = tarifas.KmMaritimo;
  distancia: number;

  constructor(peso: number, distancia: number) {
    super();
    this.peso = peso;
    this.distancia = distancia;
  }

  portadoresNecesarios(): number {
    return 1; // Solo un barco
  }

  calcularPrecio(): number {
    const precio = this.distancia * this.precioKm * this.peso * this.precioKg;
    return Number(precio.toFixed(2));
  }
}
