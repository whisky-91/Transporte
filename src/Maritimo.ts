import { tarifas } from "./tarifas";
import { Transporte } from "./Transporte";
// Clase maritimo
export class Maritimo extends Transporte {
  static tipo: string = "maritimo";
  precioKg: number = tarifas.KgMarino;
  precioKm: number = tarifas.KmMaritimo;
  distancia: number;
  peso: number;
  //constructor
  constructor(
    distancia: number = 0,
    peso: number = 0
  ) {
    super()
    this.distancia = distancia;
    this.peso = peso;
  }

  //Método calcular precio  
  calcularPrecio(): number {
    //Calculamos el precio
    let precio = this.distancia * this.precioKm + this.peso * this.precioKg;
    precio = Number(precio.toFixed(2))  // 2 decimales
    return precio;
  }
}