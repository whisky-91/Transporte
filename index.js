const apiKey = "pk.7fc9cca20ec9becf0a5da73023a73c5d"


const puntoInicial = { latitud: 41.50302456452686, longitud: -5.74693999773211 }
const puntoFinal = { latitud: 39.985002315833796, longitud: 4.087154850251836 }

const url = `https://eu1.locationiq.com/v1/directions/driving/${puntoInicial.longitud},${puntoInicial.latitud};${puntoFinal.longitud},${puntoFinal.latitud}?key=${apiKey}&steps=true&alternatives=true&geometries=polyline&overview=full&geometries=geojson`



let countTerrestre = 0;
let countMarítimo = 0;
axios.get(url)
    .then(response => {
        let pasos = response.data.routes[0].legs[0]
        let distancia = pasos.distance
        let duracion = pasos.duration
        let steps = pasos.steps

        steps.forEach(step => {
            if (step.mode === "driving") {
                countTerrestre += step.distance;
            } else {
                countMarítimo += step.distance
            }
        });

        console.log("Distancia total:", distancia, "metros")
        console.log("Duracion aproximada:", duracion, "segundos")

        console.log("Distancia terrestre", countTerrestre, "metros");
        console.log("Distancia marítima", countMarítimo, "metros");
    })