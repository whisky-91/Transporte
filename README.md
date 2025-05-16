# Transporte

Rama encarcada de la implementación de back-end y refactorización del mismo.

## Procedimiento

- He separado las trarifas para que puedan ser encontradas y modificadas más 
  facilmente.   
- He rebautizado algunas prpiedades de las clases.
- He redefinido la lógica de la clase Terrestre.
- He redefinido la lógica de la clase Mixto. 
  - EXPLICACIÓN: Ya que mixto hace referencia a la suma entre transporte 
    terrestre y transporte marítimo. Considero que no tiene sentido que 
    herede de la clase Transporte, como sí lo hacen Maritimo y Terrestre.
    No estamos hablando de un tercer tipo de transporte, sino la suma de
    estos dos.
- He separado cada una de las clases a su correspondiente ".ts".

## Datos a tener en cuenta

Para este modelo de negocio es necesario tener 3 variables bien diferencias:
- Distancia terrestre
- Distancia marítima
- Peso