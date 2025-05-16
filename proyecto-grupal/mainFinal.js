"use strict";
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
//# sourceMappingURL=mainFinal.js.map