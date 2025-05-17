define("tarifas", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tarifas = void 0;
    exports.tarifas = {
        PesoMaxTerrestre: 5000,
        KmTerrestre: 2,
        KmMaritimo: 1,
        KgTerrestre: 0.5,
        KgMarino: 0.2
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
        constructor(peso, distancia) {
            super();
            this.pesoMax = Infinity;
            this.precioKg = tarifas_1.tarifas.KgMarino;
            this.precioKm = tarifas_1.tarifas.KmMaritimo;
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
    exports.Maritimo = Maritimo;
});
define("Mixto", ["require", "exports", "Transporte"], function (require, exports, Transporte_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Mixto = void 0;
    class Mixto extends Transporte_2.Transporte {
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
    exports.Mixto = Mixto;
});
define("Terrestre", ["require", "exports", "tarifas", "Transporte"], function (require, exports, tarifas_2, Transporte_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Terrestre = void 0;
    class Terrestre extends Transporte_3.Transporte {
        constructor(peso, distancia) {
            super();
            this.pesoMax = tarifas_2.tarifas.PesoMaxTerrestre;
            this.precioKg = tarifas_2.tarifas.KgTerrestre;
            this.precioKm = tarifas_2.tarifas.KmTerrestre;
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
    exports.Terrestre = Terrestre;
    Terrestre.tipo = "terrestre";
});
define("main", ["require", "exports", "Terrestre", "Maritimo", "Mixto"], function (require, exports, Terrestre_1, Maritimo_1, Mixto_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const pesoTotal = 15000;
    const tramo1 = new Terrestre_1.Terrestre(pesoTotal, 500);
    const tramo2 = new Maritimo_1.Maritimo(pesoTotal, 2000);
    const tramo3 = new Terrestre_1.Terrestre(pesoTotal, 300);
    const combinado = new Mixto_1.Mixto(pesoTotal, tramo1, tramo2, tramo3);
    console.log("Precio total del transporte mixto:", combinado.calcularPrecio(), "€");
});
