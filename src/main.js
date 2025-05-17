import { Terrestre } from "./transportes/Terrestre.js";
import { Maritimo } from "./transportes/Maritimo.js";
import { Mixto } from "./transportes/Mixto.js";
const pesoTotal = 15000;
const tramo1 = new Terrestre(pesoTotal, 500);
const tramo2 = new Maritimo(pesoTotal, 2000);
const tramo3 = new Terrestre(pesoTotal, 300);
const combinado = new Mixto(pesoTotal, tramo1, tramo2, tramo3);
console.log("Precio total del transporte mixto:", combinado.calcularPrecio(), "€");
//# sourceMappingURL=main.js.map