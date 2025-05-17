/**
 * Clase abstract para usar de base para las calses hijas
 */
export abstract class Transporte {
  abstract pesoMax: number | number[];
  abstract peso: number;
  abstract precioKg: number | number[];
  abstract precioKm: number | number[];
  abstract distancia: number | number[];

  abstract calcularPrecio(): number;
}
