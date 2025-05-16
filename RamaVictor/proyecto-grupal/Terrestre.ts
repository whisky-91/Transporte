import { tarifas } from "./tarifas.js";
import { Transporte } from "./Transporte.js";

export class Terrestre extends Transporte {
  static tipo: string = "terrestre";
  pesoMax: number = tarifas.MaxPeso
  precioKg: number = tarifas.KgTerrestre;
  precioKm: number = tarifas.KmTerrestre;
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
  // Dividimos la carga en varios camiones, de ser necesario
  camionesNecesarios(): number {
    const numCamiones = Math.ceil(this.peso / this.pesoMax);
    return numCamiones
  }
  //Método calcular precio
  calcularPrecio(): number {
    const camiones = this.camionesNecesarios()
    //Calculamos el precio
    let precio = this.distancia * this.precioKm * camiones * this.precioKg;
    precio = Number(precio.toFixed(2))  // 2 decimales
    return precio;
  }
}