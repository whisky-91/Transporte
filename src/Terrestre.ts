import { tarifas } from "./tarifas.js";
import { Transporte } from "./Transporte.js";

export class Terrestre extends Transporte {
  static tipo: string = "terrestre";
  peso: number;
  pesoMax: number = tarifas.PesoMaxTerrestre;
  precioKg: number = tarifas.KgTerrestre;
  precioKm: number = tarifas.KmTerrestre;
  distancia: number;

  constructor(peso: number, distancia: number) {
    super();
    this.peso = peso;
    this.distancia = distancia;
  }

  portadoresNecesarios(): number {
    return Math.ceil(this.peso / this.pesoMax);
  }

  calcularPrecio(): number {
    const portadores = this.portadoresNecesarios();
    const precio =
      this.distancia * this.precioKm * portadores * this.precioKg;
    return Number(precio.toFixed(2));
  }
}
