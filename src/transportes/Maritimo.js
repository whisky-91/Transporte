import { tarifas } from "../tarifas.js";
import { Transporte } from "./Transporte.js";
export class Maritimo extends Transporte {
    constructor(peso, distancia) {
        super();
        this.pesoMax = Infinity;
        this.precioKg = tarifas.KgMarino;
        this.precioKm = tarifas.KmMaritimo;
        this.peso = peso;
        this.distancia = distancia;
    }
    portadoresNecesarios() {
        return 1;
    }
    calcularPrecio() {
        const precio = this.distancia * this.precioKm * this.peso * this.precioKg;
        return Number(precio.toFixed(2));
    }
}
//# sourceMappingURL=Maritimo.js.map