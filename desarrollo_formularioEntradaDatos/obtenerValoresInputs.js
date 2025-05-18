let inputPeso;
let inputCiudadOrigen;
let inputCiudadDestino;

function obtenerValorInputPeso() {
  const peso = document.getElementById("idPeso").value;
  inputPeso = Number(peso);

  if (inputPeso < 0) {
    alert('No se admiten números negativos \n\nVuelva a introducir el peso de la carga');
  } else {
    return inputPeso;
  }
}

function obtenerValorInputCiudadOrigen() {
  inputCiudadOrigen = document.getElementById("idInputCiudadOrigen").value.toLowerCase();

  if (inputCiudadOrigen === "") {
    alert('Introduzca una ciudad de origen');
    
  } else {
    return inputCiudadOrigen;
  }

}

function obtenerValorInputCiudadDestino() {
  inputCiudadDestino = document.getElementById("idInputCiudadDestino").value.toLowerCase();

  if (inputCiudadDestino === "") {
    alert('Introduzca una ciudad de destino');
    
  } else {
    return inputCiudadOrigen;
  }
}

const enviarForm = document.getElementById("btnEnviarDatosInputs");

enviarForm.addEventListener("click", function () {
  obtenerValorInputPeso();
  obtenerValorInputCiudadOrigen();
  obtenerValorInputCiudadDestino();
  console.log("Peso ingresado (en número):", { inputPeso });
  console.log("Ciudad de origen ingresada:", { inputCiudadOrigen });
  console.log("Ciudad de destino ingresada:", { inputCiudadDestino });
});
