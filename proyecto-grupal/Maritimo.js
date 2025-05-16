import { tarifas } from "./tarifas.js";
import { Transporte } from "./Transporte.js";
export class Maritimo extends Transporte {
    constructor(distancia = 0, peso = 0) {
        super();
        this.precioKg = tarifas.KgMarino;
        this.precioKm = tarifas.KmMaritimo;
        this.distancia = distancia;
        this.peso = peso;
    }
    calcularPrecio() {
        let precio = this.distancia * this.precioKm + this.peso * this.precioKg;
        precio = Number(precio.toFixed(2));
        return precio;
    }
}
Maritimo.tipo = "maritimo";
//# sourceMappingURL=Maritimo.js.map