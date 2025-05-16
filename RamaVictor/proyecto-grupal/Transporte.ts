//Creamos la clase abstract para usar de base
export abstract class Transporte {
  abstract precioKg: number;
  abstract precioKm: number;
  abstract distancia: number;
  abstract peso: number

  //Metodo abstracto para calcular el precio
  abstract calcularPrecio(): number;
}