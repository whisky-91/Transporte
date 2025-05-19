import { loadDatabase } from "./cargadorDB.js";

export async function inicializarApp() {
  return await loadDatabase();
}

const db = await inicializarApp();
let ruta1 = db.calcularRuta("Barcelona", "Badajoz");
console.log(ruta1);
