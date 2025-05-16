import { Terrestre } from "./Terrestre.js";
import { Maritimo } from "./Maritimo.js";
export class Mixto {
    constructor(kmTerrestres, kmMaritimos, peso) {
        this.rutaTerrestre = new Terrestre();
        this.rutaMaritima = new Maritimo();
        this.peso = peso;
    }
    calcularPrecio() {
        let costoMaritimo = this.rutaMaritima.calcularPrecio();
        let costoTerrestre = this.rutaTerrestre.calcularPrecio();
        let precio = costoTerrestre + costoMaritimo;
        precio = Number(precio.toFixed(2));
        return precio;
    }
}
//# sourceMappingURL=Mixto.js.map