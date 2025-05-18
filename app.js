import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
});

async function obtenerRespuesta() {
  try {
    const chat = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "user",
          content: 'Situación: Aplicación que de el precio de la ruta del punto A al punto B. Se debe tener en cuenta la orgrafía del terreno, los puertos accesibles y las carreteras disponibles, a la hora de seleccionar camíón y/o barco. Por eso puede ser muy necesario emplear la combinación de ambos para llevar la carga.  Tarifas: Tarifa del barco: 1€ el kilómetro y 0.20€ el kilogramo. Tarifa camión: 2€ el kilómetro y 0.50€ el kilogramo. Condiciones: El barco no tiene limite de carga, pero sólo puede viajar por mar de puerto en puerto. Para iniciar el viaje por barco, hay que llevar la carga por camión, al puerto más cercano. Una vez Y el camión tiene la limitación de que sólo puede llevar 5000kg de carga y circular por carretera; en caso de que sobrepase este peso, debe agregarse otro camión. No existe límite de camiones que se le puedan sumar.  Petición: Tienes que calcular el costo de la ruta más optima entre  el punto 40.97038714408946, -5.663380502049027 y el punto 39.57241905532166, 3.205699165614267 para llevar una carga de 8000kg. Y me des sólo el resultado en el siguiente formato json'
        }
      ]
    });

    console.log(chat.choices[0].message.content)
  } catch (error) {
    console.error("Error en la solicitud", error);
  }
}

obtenerRespuesta();

// { "precios": { "precioCamion": "numero€", "precioBarco": "numero€","precioTotal": "numero€"}, "distancias": { "distanciaCamion": "numeroKm", "distanciaBarco": "numeroKm", "distanciaTotal": "numeroKm" } }