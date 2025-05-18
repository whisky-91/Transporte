const ciudadesCosteras = [
  "barcelona",
  "valencia",
  "alicante",
  "malaga",
  "almeria",
  "cartagena",
  "gijon",
  "santander",
  "cadiz",
  "bilbao",
  "las palmas",
  "palma",
  "tarragona",
  "ceuta",
  "melilla",
];

function esCostera(ciudad) {
  return ciudadesCosteras.includes(ciudad.toLowerCase());
}

function buscarRuta() {
  const origen = document.getElementById("origen").value.trim();
  const destino = document.getElementById("destino").value.trim();
  const tipo = document.getElementById("tipoRuta").value;

  const resultados = document.getElementById("resultados");

  // Validación
  if (!origen || !destino) {
    alert("Por favor, completa todas las casillas.");
    return;
  }

  const origenCostero = esCostera(origen);
  const destinoCostero = esCostera(destino);

  let tipoTrayecto;
  if (origenCostero && destinoCostero) {
    tipoTrayecto = "marítimo o terrestre";
  } else {
    tipoTrayecto = "terrestre";
  }

  resultados.innerHTML = `
    <p><strong>Origen:</strong> ${origen}</p>
    <p><strong>Destino:</strong> ${destino}</p>
    <p><strong>Tipo de Ruta:</strong> ${
      tipo.charAt(0).toUpperCase() + tipo.slice(1)
    }</p>
    <div class="route-option">
      <strong>Trayecto (${tipoTrayecto})</strong><br/>
      Opción 1: Salida 08:00 - Llegada 12:00<br/>
      Precio: 25 €
    </div>
    <div class="route-option">
      Opción 2: Salida 14:00 - Llegada 18:30<br/>
      Precio: 28 €
    </div>
  `;

  resultados.style.display = "block";
}
