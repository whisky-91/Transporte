// import ciudades from "./dataBase/provinciasCiudadesDB.json" assert { type: "json" };
// import puertos from "./dataBase/puertosPrincipalesDB.json" assert { type: "json" };
// import distanciasMaritimas from "./dataBase/distanciaMaritimaDB.json" assert { type: "json" };
// import distanciasTerrestres from "./dataBase/distanciaTerrestreDB.json" assert { type: "json" };

export class DataBaseIterator {
  constructor(data) {
    this.ciudades = data.ciudades;
    this.distanciasTerrestres = data.distanciasTerrestres;
    this.distanciasMaritimas = data.distanciasMaritimas;
  }

  /**
   * Método de la clase para recorrer la base de datos:
   * @param {*} ciudadOrigen
   * @param {*} ciudadDestino
   */
  calcularRuta(ciudadOrigen, ciudadDestino) {
    const origen = this._buscarCiudad(ciudadOrigen);
    const destino = this._buscarCiudad(ciudadDestino);

    if (!origen || !destino) {
      throw new Error("Una o ambas ciudades no existen");
    }

    const ruta = {
      origen: ciudadOrigen,
      destino: ciudadDestino,
      distanciaTotal: 0,
      viajaPorMar: false,
      distanciaMar: 0,
      distanciaTierra: 0,
      pasos: [],
      tramos: [],
    };

    /**
     * Ruta dentro de la misma provincia:
     */
    if (origen.provincia === destino.provincia) {
      this._agregarTramoTerrestre(ruta, origen, destino);
      return ruta;
    }

    const capitalOrigen = this._buscarCapital(origen.provincia);
    const capitalDestino = this._buscarCapital(destino.provincia);

    /**
     * Tramo: Ciudad Origen -> Capital Provincia Origen
     */
    this._agregarTramoTerrestre(ruta, origen, capitalOrigen);

    /**
     * Conexión entre capitales:
     */
    const necesitaMaritimo = this._requiereTramoMaritimo(
      capitalOrigen,
      capitalDestino
    );

    if (necesitaMaritimo) {
      const { puertoOrigen, puertoDestino, distanciaMar } =
        this._obtenerPuertosObligatorios(capitalOrigen, capitalDestino);

      /**
       * Capital de origen -> Puerto de origen:
       */
      this._agregarTramoTerrestre(ruta, capitalOrigen, puertoOrigen);

      /**
       * Tramo marítimo:
       */
      this._agregarTramoMaritimo(
        ruta,
        puertoOrigen,
        puertoDestino,
        distanciaMar
      );

      /**
       * Puerto de destino -> Capital de destino:
       */
      this._agregarTramoTerrestre(ruta, puertoDestino, capitalDestino);
    } else {
      /**
       * Ruta completamente terrestre entre capitales:
       */
      this._agregarTramoTerrestre(ruta, capitalOrigen, capitalDestino);
    }

    /**
     * Tramo: Capital de provincia de destino -> Ciudad de destino:
     */
    this._agregarTramoTerrestre(ruta, capitalDestino, destino);

    /**
     * Calculo total de ruta:
     */
    ruta.distanciaTotal = ruta.distanciaTierra + ruta.distanciaMar;
    return ruta;
  }

  /**
   * Métodos auxiliares:
   */
  _buscarCiudad(nombreCiudad) {
    for (const provincia of this.ciudades) {
      /**
       * Buscar en capitales:
       */
      if (provincia.capital === nombreCiudad) {
        return {
          nombre: provincia.capital,
          provincia: provincia.nombre,
          esCapital: true,
          distancia_km_capital: 0,
          puerto_mas_cercano: provincia.puerto_mas_cercano,
        };
      }

      /**
       * Buscar en ciudades principales:
       */
      for (const ciudad of provincia.ciudades_principales) {
        if (ciudad.nombre === nombreCiudad) {
          return {
            nombre: ciudad.nombre,
            provincia: provincia.nombre,
            esCapital: false,
            distancia_km_capital: ciudad.distancia_km_capital,
            puerto_mas_cercano:
              ciudad.puerto_mas_cercano || provincia.puerto_mas_cercano,
          };
        }
      }
    }
    return null;
  }

  _buscarCapital(nombreProvincia) {
    const provincia = this.ciudades.find((p) => p.nombre === nombreProvincia);
    return provincia
      ? {
          nombre: provincia.capital,
          provincia: provincia.nombre,
          puerto_mas_cercano: provincia.puerto_mas_cercano,
        }
      : null;
  }

  _getProvincia(nombreProvincia) {
    return this.ciudades.find((p) => p.nombre === nombreProvincia);
  }

  _requiereTramoMaritimo(capitalOrigen, capitalDestino) {
    const provinciaOrigen = this._getProvincia(capitalOrigen.provincia);
    const provinciaDestino = this._getProvincia(capitalDestino.provincia);

    /**
     * Verifica puertos obligatorios:
     */
    const puertoOrigenObligatorio =
      provinciaOrigen.puerto_mas_cercano?.es_obligatorio;
    const puertoDestinoObligatorio =
      provinciaDestino.puerto_mas_cercano?.es_obligatorio;

    /**
     * Solo marítimo si algún puerto es obligatorio y existe conexión:
     */
    return (
      (puertoOrigenObligatorio || puertoDestinoObligatorio) &&
      this._existeRutaMaritima(provinciaOrigen, provinciaDestino)
    );
  }

  _existeRutaMaritima(provinciaOrigen, provinciaDestino) {
    const puertoOrigen = provinciaOrigen.puerto_mas_cercano?.nombre;
    const puertoDestino = provinciaDestino.puerto_mas_cercano?.nombre;

    return (
      puertoOrigen &&
      puertoDestino &&
      this.distanciasMaritimas.some(
        (d) =>
          (d.puerto_origen === puertoOrigen &&
            d.puerto_destino === puertoDestino) ||
          (d.puerto_origen === puertoDestino &&
            d.puerto_destino === puertoOrigen)
      )
    );
  }

  _obtenerPuertosObligatorios(capitalOrigen, capitalDestino) {
    const provinciaOrigen = this._getProvincia(capitalOrigen.provincia);
    const provinciaDestino = this._getProvincia(capitalDestino.provincia);

    const puertoOrigen = provinciaOrigen.puerto_mas_cercano;
    const puertoDestino = provinciaDestino.puerto_mas_cercano;

    const distanciaMar =
      this.distanciasMaritimas.find(
        (d) =>
          (d.puerto_origen === puertoOrigen.nombre &&
            d.puerto_destino === puertoDestino.nombre) ||
          (d.puerto_origen === puertoDestino.nombre &&
            d.puerto_destino === puertoOrigen.nombre)
      )?.distancia_km || 0;

    return { puertoOrigen, puertoDestino, distanciaMar };
  }

  _calcularDistanciaTerrestre(desde, hacia) {
    /**
     * Misma ciudad:
     */
    if (desde.nombre === hacia.nombre) return 0;

    /**
     * Misma provincia:
     */
    if (desde.provincia === hacia.provincia) {
      /**
       * Una de ellas es la capital:
       */
      if (desde.esCapital) return hacia.distancia_km_capital;
      if (hacia.esCapital) return desde.distancia_km_capital;

      /**
       * Ambas son ciudades no capitales:
       */
      return desde.distancia_km_capital + hacia.distancia_km_capital;
    }

    /**
     * Entre capitales de diferentes provincias:
     */
    if (desde.esCapital && hacia.esCapital) {
      return this._calcularDistanciaEntreCapitales(desde.nombre, hacia.nombre);
    }

    /**
     * Si es un caso no contemplado, retorna 0:
     */
    return 0;
  }

  _calcularDistanciaEntreCapitales(capitalOrigen, capitalDestino) {
    /**
     * Busca en dirección normal:
     */
    const rutaDirecta = this.distanciasTerrestres.find(
      (d) =>
        d.capital_origen === capitalOrigen &&
        d.capital_destino === capitalDestino
    );

    if (rutaDirecta) return rutaDirecta.distancia_km;

    /**
     * Búsqueda en dirección inversa:
     */
    const rutaInversa = this.distanciasTerrestres.find(
      (d) =>
        d.capital_origen === capitalDestino &&
        d.capital_destino === capitalOrigen
    );

    return rutaInversa ? rutaInversa.distancia_km : 0;
  }

  _agregarTramoTerrestre(ruta, desde, hacia) {
    const distancia = this._calcularDistanciaTerrestre(desde, hacia);
    if (distancia <= 0) return;

    ruta.distanciaTierra += distancia;
    ruta.pasos.push(
      `De ${desde.nombre} a ${hacia.nombre} (${distancia}km por tierra)`
    );
    ruta.tramos.push({
      tipo: "tierra",
      desde: desde.nombre,
      hacia: hacia.nombre,
      distancia,
    });
  }

  _agregarTramoMaritimo(ruta, puertoOrigen, puertoDestino, distancia) {
    if (!puertoOrigen || !puertoDestino || distancia <= 0) return;

    ruta.viajaPorMar = true;
    ruta.distanciaMar += distancia;
    ruta.pasos.push(
      `De ${puertoOrigen.nombre} a ${puertoDestino.nombre} (${distancia}km por mar)`
    );
    ruta.tramos.push({
      tipo: "mar",
      desde: puertoOrigen.nombre,
      hacia: puertoDestino.nombre,
      distancia,
    });
  }
}

const iterator = new DataBaseIterator();

const ruta1 = iterator.calcularRuta("Santander", "Sevilla");
console.log(ruta1);
