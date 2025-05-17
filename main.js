"use strict";
define("tarifas", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tarifas = void 0;
    exports.tarifas = {
        KmTerrestre: 2,
        KmMaritimo: 1,
        KgTerrestre: 0.5,
        KgMarino: 0.2,
        MaxPeso: 5000
    };
});
define("Transporte", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Transporte = void 0;
    class Transporte {
    }
    exports.Transporte = Transporte;
});
define("Maritimo", ["require", "exports", "tarifas", "Transporte"], function (require, exports, tarifas_1, Transporte_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Maritimo = void 0;
    class Maritimo extends Transporte_1.Transporte {
        constructor(distancia = 0, peso = 0) {
            super();
            this.precioKg = tarifas_1.tarifas.KgMarino;
            this.precioKm = tarifas_1.tarifas.KmMaritimo;
            this.distancia = distancia;
            this.peso = peso;
        }
        calcularPrecio() {
            let precio = this.distancia * this.precioKm + this.peso * this.precioKg;
            precio = Number(precio.toFixed(2));
            return precio;
        }
    }
    exports.Maritimo = Maritimo;
    Maritimo.tipo = "maritimo";
});
define("Terrestre", ["require", "exports", "tarifas", "Transporte"], function (require, exports, tarifas_2, Transporte_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Terrestre = void 0;
    class Terrestre extends Transporte_2.Transporte {
        constructor(distancia = 0, peso = 0) {
            super();
            this.pesoMax = tarifas_2.tarifas.MaxPeso;
            this.precioKg = tarifas_2.tarifas.KgTerrestre;
            this.precioKm = tarifas_2.tarifas.KmTerrestre;
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
    exports.Terrestre = Terrestre;
    Terrestre.tipo = "terrestre";
});
define("Mixto", ["require", "exports", "Terrestre", "Maritimo"], function (require, exports, Terrestre_1, Maritimo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Mixto = void 0;
    class Mixto {
        constructor(kmTerrestres, kmMaritimos, peso) {
            this.rutaTerrestre = new Terrestre_1.Terrestre();
            this.rutaMaritima = new Maritimo_1.Maritimo();
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
    exports.Mixto = Mixto;
});
function main() {
    var _a;
    const tipo = (_a = prompt("Tipo de transporte (maritimo, terrestre, mixto):")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    switch (tipo) {
        case "maritimo":
            const distanciaMar = Number(prompt("Distancia en km:"));
            const pesoMar = Number(prompt("Peso en kg:"));
            const maritimo = new Maritimo(distanciaMar, pesoMar);
            maritimo.calcularPrecio();
            break;
        case "terrestre":
            const distanciaTerr = Number(prompt("Distancia en km:"));
            const pesoTerr = Number(prompt("Peso en kg:"));
            const terrestre = new Terrestre(distanciaTerr, pesoTerr);
            terrestre.calcularPrecio();
            break;
        case "mixto":
            const kmTierra = Number(prompt("¿Cuántos km por tierra?"));
            const kmMar = Number(prompt("¿Cuántos km por mar?"));
            const pesoMixto = Number(prompt("Peso total en kg:"));
            const mixto = new Mixto(kmTierra, kmMar, pesoMixto);
            mixto.calcularPrecio();
            break;
        default:
            console.log("Tipo de transporte no válido.");
    }
}
main();
