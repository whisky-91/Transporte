import { cargarDatos } from "./cargadorDB.js";
import { DataBaseIterator } from "./ClaseConsulta.js";

async function main() {
  try {
    const datos = await cargarDatos();
    const iterator = new DataBaseIterator(datos);

    const ruta = iterator.calcularRuta("Madrid", "Palma de Mallorca");
    console.log("Ruta calculada:", ruta);

    // Actualizar la interfaz aquí
    document.getElementById(
      "resultado"
    ).textContent = `Distancia total: ${ruta.distanciaTotal}km`;
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

// Iniciar cuando el DOM esté listo
if (document.readyState !== "loading") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}
