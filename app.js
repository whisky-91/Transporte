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
          content: "Situación:Esto programando una aplicación que me de la ruta con menor coste para trasladar una hipotética carga. Así que concibo llevar la carga o por bargo, o por camión. Siendo la tarifa del barco de 1€ el kilómetro y 0.20€ el kilogramo. Y la de camión de 2€ el kilómetro y 0.50€ el kilogramo. A mayores, el camión tiene la limitación de que sólo puede llevar 5000kg de carga. En caso de que sobrepase este peso, debe agregarse otro camión. No existe límite de camiones que se le puedan sumar. Hay que valorar si esa ruta se puede ser sólo terrestre, sólo marítima, o la suma de ambos. Petición: Tienes que calcular el costo para llevar una carga de 8000kg, desde la ciudad de Salamanca hasta la de Santa Cruz de Tenerife. Y me des solamente el resultado, sin ninguna explicción en el siguiente formato: { terrestre: número , maritimo: número , total: número }"
        }
      ]
    });

    console.log(chat.choices[0].message.content)
  } catch (error) {
    console.error("Error en la solicitud", error);
  }
}

obtenerRespuesta();