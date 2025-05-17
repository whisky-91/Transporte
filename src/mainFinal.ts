//Función para pedir los promt y hacer el switch de las opciones
function main() {
  //pedimos tipo de transporte con un prompt. usamos el operador ? para evitar que se produzca un null y falle cuando llama al método toLowerCase. devolvera undefined
  const tipo = prompt("Tipo de transporte (maritimo, terrestre, mixto):")?.toLowerCase();

  //switch para elegir el tipo de transporte
  switch (tipo) {
    case "maritimo":
      //pedimos distancia y peso con mediante prompt
      const distanciaMar = Number(prompt("Distancia en km:"));
      const pesoMar = Number(prompt("Peso en kg:"));
      //instanciamos un objeto maritimo de la clase Maritimo y llamamos al método para calcular el precio
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

//ejecutamos main para iniciar el programa
main();
