import axios from "axios";

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