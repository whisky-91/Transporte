import { Transporte } from "./Transporte";
import { Terrestre } from "./Terrestre";
import { Maritimo } from "./Maritimo";

export class Mixto {
  //propiedades propias de Mixto para almacenar los kilometros terrestres y marítimos
  rutaTerrestre: Transporte;
  rutaMaritima: Transporte;
  peso: number;

  constructor(kmTerrestres: number, kmMaritimos: number, peso: number) {
    //sumamos los kmTerrestres y maritimos para que en el constructor padre se pase la distancia total, que es lo que recibe.

    this.rutaTerrestre = new Terrestre();
    this.rutaMaritima = new Maritimo();
    this.peso = peso;
  }

  calcularPrecio(): number {
    let costoMaritimo = this.rutaMaritima.calcularPrecio()
    let costoTerrestre = this.rutaTerrestre.calcularPrecio()
    //Calculamos el precio
    let precio = costoTerrestre + costoMaritimo;
    precio = Number(precio.toFixed(2))  // 2 decimales
    return precio;
  }
}