Estructura de la base de datos:

provinciasCiudadesDB:

    Propósito: Listado con las ciudades capitales de provincias y
    las tres ciudades más grandes de cada provincia, dando un total
    de 4 con la distancia entre ellas y la capital de provincia.

    Esquema:

    {
      "provincias": [
        "nombre":string,
        "capital":string,
        "es_costera":boolean,
        "puerto_mas_cercano": {
          "nombre":string,
          "distancia_km":number,
          "es_obligatorio":false
        },
        "ciudades_principales": [
          {
            "nombre":string,
            "distancia_km_capital":number,
            "puerto_mas_cercano": {
              "nombre":string,
              "distancia_km":number,
              "es_obligatorio":boolean
            }
          }
        ]
      ]
    }

    En caso de tener el campo:

        "puerto_mas_cercano": null

      toma el puerto que toma la capital.

    En caso de tener en el campo:

        "es_obligatorio": true

      entonces se tratará de una ciudad marítima
      que necesita conexión por puerto.

puertosPrincipalesDB:

    Propósito: Listar todos los puertos a los que
    las ciudades y ciudades capitales tienen acceso
    siendo este siempre el más cercano a ellas y
    habiendo solo uno en cada ciudad.

    Esquema:

    {
      "puertos_principales": [
        {
          "nombre":string,
          "provincia": string,
          "ciudad_ubicacion": string
        }
      ]
    }

distanciaTerrestreDB:

    Propósito: Listar todos los posibles caminos entre
    capitales de provincia solo de ida (por tanto
    si no encuentras Sevilla-Barcelona tendrías que buscar
    Barcelona-Sevilla ya que es la misma distancia) para
    evitar así repetir datos y extender en exceso la DB.

    Esquema:

    {
      "distancias_terrestres": [
        {
        "capital_origen":string,
        "capital_destino":string,
        "distancia_km":number
        },
      ]
    }

distanciaMaritimaDB:

    Propósito: Crear una DB con todos los puertos unidos
    entre sí al menos una vez con el más cercano, Baleares
    y Canarias sus puertos entre si y a la península al menos una vez (los de Canarias con ellos mismos y Cádiz/Huelva y los de las Islas Baleares entre sí y con Valencia), para tener asi
    una DB con las distancias entre los puertos necesarios.

    Esquema:
    {
      "distancias_maritimas": [
        {
        "puerto_origen":string,
          "puerto_destino":string,
          "distancia_km":number
        }
      ]
    }

Ejemplo de uso de la ClaseConsulta:
const iterator = new DataBaseIterator();

Caso 1: Ruta terrestre (sin puertos obligatorios)
const ruta1 = iterator.calcularRuta("Madrid", "Barcelona");
console.log(ruta1);

Caso 2: Ruta con puerto obligatorio
const ruta2 = iterator.calcularRuta("Ciudad con puerto obligatorio", "Otra ciudad");
console.log(ruta2);

Caso 3: Ruta dentro de la misma provincia
const ruta3 = iterator.calcularRuta("Vitoria-Gasteiz", "Llodio");
console.log(ruta3);
