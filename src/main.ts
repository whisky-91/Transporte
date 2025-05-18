import { Terrestre } from "./transportes/Terrestre.js";
import { Maritimo } from "./transportes/Maritimo.js";
import { Mixto } from "./transportes/Mixto.js";

const apiKey = "pk.7fc9cca20ec9becf0a5da73023a73c5d"

const puntoInicial = { latitud: 41.50302456452686, longitud: -5.74693999773211 }
const puntoFinal = { latitud: 39.985002315833796, longitud: 4.087154850251836 }

const url = `https://eu1.locationiq.com/v1/directions/driving/${puntoInicial.longitud},${puntoInicial.latitud};${puntoFinal.longitud},${puntoFinal.latitud}?key=${apiKey}&steps=true&alternatives=true&geometries=polyline&overview=full&geometries=geojson`

export async function obtenerDatosRuta(url: string) {
  const response = await axios.get(url);

  let pasos = response.data.routes[0].legs[0];
  let distancia = pasos.distance;
  let duracion = pasos.duration;
  let steps = pasos.steps;

  let countTerrestre = 0;
  let countMaritimo = 0;

  steps.forEach(step => {
    if (step.mode === "driving") {
      countTerrestre += step.distance;
    } else {
      countMaritimo += step.distance;
    }
  });

  return {
    distanciaTotal: distancia,
    duracionTotal: duracion,
    distanciaTerrestre: countTerrestre,
    distanciaMaritima: countMaritimo
  };
}


const datosRuta = obtenerDatosRuta(url)

console.log(datosRuta);
// Carga a transportar
const pesoTotal = 15000;

// Tramos de transporte
const tramo1 = new Terrestre(pesoTotal, 500);
const tramo2 = new Maritimo(pesoTotal, 2000);
const tramo3 = new Terrestre(pesoTotal, 300);

// Transporte combinado
const combinado = new Mixto(pesoTotal, tramo1, tramo2, tramo3);

// Mostrar resultados
console.log("Precio total del transporte mixto:", combinado.calcularPrecio(), "€");
