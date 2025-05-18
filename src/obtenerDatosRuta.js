var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
export function obtenerDatosRuta(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios.get(url);
        let pasos = response.data.routes[0].legs[0];
        let distancia = pasos.distance;
        let duracion = pasos.duration;
        let steps = pasos.steps;
        let countTerrestre = 0;
        let countMaritimo = 0;
        steps.forEach(step => {
            if (step.mode === "driving") {
                countTerrestre += step.distance;
            }
            else {
                countMaritimo += step.distance;
            }
        });
        return {
            distanciaTotal: distancia,
            duracionTotal: duracion,
            distanciaTerrestre: countTerrestre,
            distanciaMaritima: countMaritimo
        };
    });
}
//# sourceMappingURL=obtenerDatosRuta.js.map