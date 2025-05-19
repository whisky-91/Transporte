// export async function cargarDatos() {
//   const baseUrl = "./dataBase";
//   const urls = [
//     "provinciasCiudadesDB.json",
//     "distancias_terrestres.json",
//     "distancias_maritimas.json",
//   ];

//   const responses = await Promise.all(
//     urls.map((url) => fetch(`${baseUrl}/${url}`).then((r) => r.json()))
//   );

//   return {
//     ciudades: responses[0].provincias,
//     distanciasTerrestres: responses[1].distancias_terrestres,
//     distanciasMaritimas: responses[2].distancias_maritimas,
//   };
// }
