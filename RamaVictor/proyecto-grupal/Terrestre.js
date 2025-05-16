import { tarifas } from "./tarifas.js";
import { Transporte } from "./Transporte.js";
export class Terrestre extends Transporte {
    constructor(distancia = 0, peso = 0) {
        super();
        this.pesoMax = tarifas.MaxPeso;
        this.precioKg = tarifas.KgTerrestre;
        this.precioKm = tarifas.KmTerrestre;
        this.distancia = distancia;
        this.peso = peso;
    }
    camionesNecesarios() {
        const numCamiones = Math.ceil(this.peso / this.pesoMax);
        return numCamiones;
    }
    calcularPrecio() {
        const camiones = this.camionesNecesarios();
        let precio = this.distancia * this.precioKm * camiones * this.precioKg;
        precio = Number(precio.toFixed(2));
        return precio;
    }
}
Terrestre.tipo = "terrestre";
//# sourceMappingURL=Terrestre.js.map