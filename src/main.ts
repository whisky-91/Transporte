import { Terrestre } from "./Terrestre";
import { Maritimo } from "./Maritimo";
import { Mixto } from "./Mixto";

// Carga a transportar
const pesoTotal = 15000;

// Tramos de transporte
const tramo1 = new Terrestre(pesoTotal, 500);
const tramo2 = new Maritimo(pesoTotal, 2000);
const tramo3 = new Terrestre(pesoTotal, 300);

// Transporte combinado
const combinado = new Mixto(pesoTotal, tramo1, tramo2, tramo3);

// Mostrar resultados
console.log("Precio total del transporte mixto:", combinado.calcularPrecio(), "€");
