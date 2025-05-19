// script.js completo para TransIberia

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("boton-buscar")
    .addEventListener("click", function () {
      const query = document.getElementById("buscador").value.toLowerCase();
      const secciones = document.querySelectorAll("h2, label, .portada img");

      secciones.forEach((sec) => {
        if (
          sec.alt?.toLowerCase().includes(query) ||
          sec.textContent?.toLowerCase().includes(query)
        ) {
          sec.style.outline = "2px solid orange";
        } else {
          sec.style.outline = "none";
        }
      });
    });
});

function suscribirse() {
  const email = document.getElementById("email-subscription").value;
  if (email.includes("@") && email.includes(".")) {
    alert("Gracias por suscribirte a TransIberia!");
    document.getElementById("email-subscription").value = "";
  } else {
    alert("Por favor, ingresa un correo válido.");
  }
}

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

const ciudadesPorProvincia = {
  catalunya: ["Barcelona", "Tarragona"],
  andalucia: ["Málaga", "Almería", "Cádiz"],
  valencia: ["Valencia", "Alicante", "Castellón"],
};

function actualizarCiudades() {
  const provincia = document.getElementById("provincia").value;
  const ciudadSelect = document.getElementById("ciudad");
  ciudadSelect.innerHTML = '<option value="">Selecciona una ciudad</option>';

  if (provincia && ciudadesPorProvincia[provincia]) {
    ciudadesPorProvincia[provincia].forEach((ciudad) => {
      const option = document.createElement("option");
      option.value = ciudad.toLowerCase();
      option.textContent = ciudad;
      ciudadSelect.appendChild(option);
    });
  }
}

function esCostera(ciudad) {
  return ciudadesCosteras.includes(ciudad.toLowerCase());
}

function buscarRuta() {
  const origen = document.getElementById("ciudad").value;
  const destino = document.getElementById("destino").value.trim();
  const pesoKg = parseFloat(document.getElementById("peso").value);
  const distancia = parseFloat(document.getElementById("distancia").value);
  const resultados = document.getElementById("resultados");

  if (!origen || !destino || isNaN(pesoKg) || isNaN(distancia)) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (pesoKg > 5000) {
    alert("El peso máximo permitido para transporte terrestre es de 5000 kg.");
    return;
  }

  const origenCostero = esCostera(origen);
  const destinoCostero = esCostera(destino);

  let tipoTrayecto = "terrestre";
  let precio = 0;

  if (origenCostero && destinoCostero) {
    const maritimo = distancia * 1 + pesoKg * 0.008;
    const terrestre = distancia * 2 + pesoKg * 0.01;
    precio = Math.min(maritimo, terrestre);
    tipoTrayecto = "marítimo o terrestre";
  } else if (origenCostero || destinoCostero) {
    tipoTrayecto = "mixto";
    precio = distancia * 3 + pesoKg * 0.012;
  } else {
    tipoTrayecto = "terrestre";
    precio = distancia * 2 + pesoKg * 0.01;
  }

  resultados.innerHTML = `
    <p><strong>Origen:</strong> ${origen}</p>
    <p><strong>Destino:</strong> ${destino}</p>
    <div class="route-option">
      <strong>Trayecto (${tipoTrayecto})</strong><br/>
      Distancia: ${distancia} km<br/>
      Peso: ${pesoKg} kg<br/>
      Precio estimado: <strong>${precio.toFixed(2)} €</strong>
    </div>
  `;
  resultados.style.display = "block";
}
