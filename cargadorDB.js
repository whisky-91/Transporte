import { DataBaseIterator } from "./ClaseConsulta.js";

export async function loadDatabase() {
  try {
    /**
     * Carga de los archivos con fetch en paralelo:
     */
    const [ciudades, terrestres, maritimas] = await Promise.all([
      fetch("./dataBase/provinciasCiudadesDB.json").then((res) => res.json()),
      fetch("./dataBase/distanciaTerrestreDB.json").then((res) => res.json()),
      fetch("./dataBase/distanciaMaritimaDB.json").then((res) => res.json()),
    ]);

    /**
     * Creamos y devolvemos una instancia con los datos cargados:
     */
    return new DataBaseIterator(ciudades, terrestres, maritimas);
  } catch (error) {
    console.error("Error cargando la base de datos:", error);
    throw error;
  }
}
