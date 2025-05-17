import { tarifas } from "./tarifas.js";
import { Transporte } from "./Transporte.js";
export class Terrestre extends Transporte {
    constructor(peso, distancia) {
        super();
        this.pesoMax = tarifas.PesoMaxTerrestre;
        this.precioKg = tarifas.KgTerrestre;
        this.precioKm = tarifas.KmTerrestre;
        this.peso = peso;
        this.distancia = distancia;
    }
    portadoresNecesarios() {
        return Math.ceil(this.peso / this.pesoMax);
    }
    calcularPrecio() {
        const portadores = this.portadoresNecesarios();
        const precio = this.distancia * this.precioKm * portadores * this.precioKg;
        return Number(precio.toFixed(2));
    }
}
Terrestre.tipo = "terrestre";
//# sourceMappingURL=Terrestre.js.map