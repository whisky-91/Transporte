import { Transporte } from "./Transporte.js";
export class Mixto extends Transporte {
    constructor(peso, ...medios) {
        super();
        this.pesoMax = [];
        this.precioKg = [];
        this.precioKm = [];
        this.distancia = [];
        this.medios = [];
        this.peso = peso;
        this.medios = medios;
        for (const medio of this.medios) {
            this.precioKm.push(medio.precioKm);
            this.precioKg.push(Number(medio.precioKg));
            this.distancia.push(medio.distancia);
            this.pesoMax.push(medio instanceof Mixto ? Infinity : Number(medio.pesoMax));
        }
    }
    calcularPrecio() {
        let precioTotal = 0;
        this.medios.forEach((medio) => {
            const pesoMaximo = medio instanceof Mixto ? Infinity : Number(medio.pesoMax);
            const portadores = pesoMaximo === Infinity ? 1 : Math.ceil(this.peso / pesoMaximo);
            const distancia = Number(medio.distancia);
            const precioKm = Number(medio.precioKm);
            const precioKg = Number(medio.precioKg);
            const precio = distancia * precioKm * portadores * precioKg;
            precioTotal += precio;
        });
        return Number(precioTotal.toFixed(2));
    }
}
//# sourceMappingURL=Mixto.js.map