# DESARROLLO PRUEBA TECNICA BIINTELI

### ACERCA DE LA PRUEBA

- Se realizo con el entorno de desarrollo **NodeJS** en compañia de librerias como **express** o **axios**
- Para la base de datos se uso **MongoDB**  junto a su biblioteca de modelado **mongoose** y su herramienta de modelado **mongoDB Compass**
- La lógica de divide de 3 maneras:
  - **API** -> lógica de la api para recibir la solicitud del usuario y mostrar los viajes acorde a la misma
  - **BUSINESS** -> lógica de negocio, como están construidos los viajes, vuelos y transportes
  - **DataAccess** -> lógica para verificar si la búsqueda ya esta en la base de datos, y si no lo esta, hacer la respectiva persistencia
- Además, se añadieron unos **helpers** a manera de reutilizar funcionalidad y evitar redundancia
  - **findFlights** -> buscar vuelos por su origen y destino
  - **getFlights** -> traer todos los vuelos que están en la api proporcionada 
- Mas detalle de su funcionamiento se encuentra en el código



---

### INSTRUCCIONES DE USO

**PASO 1**: descargar las herramientas correspondientes:

- NodeJS -> https://nodejs.org/en/download
- mongoDB Compass -> https://www.mongodb.com/try/download/shell



**PASO 2**: clonar el siguiente repositorio: https://github.com/http-yon/prueba-biinteli.git



**PASO 3**:  dirigirte a la carpeta y descargar todas las dependencias correspondientes:

```powershell
npm i
```



**PASO 4**: en el **.env** añadir la direccion mandada por el correo, debería verse de la siguiente manera:

```.env
MONGO_URI = "mongodb+srv://prueba-bintelli........demas parametros....."  
```



**PASO 5**: ejecutar el servidor en local

```powershell
npm run dev
```

El servidor debería empezar a correr en el puerto **10000**, este es el link -> http://localhost:10000/



---

### Problema 1 – Modelado Clases

Como encargado de la solución deberá modelar un objeto estándar para trabajar con los vuelos en su aplicación, el modelo propuesto es el siguiente (diseño UML).

#### SOLUCION

en la carpeta "business" se encuentran los objetos ya maquetados en el diseño UML propuesto



---

### Problema 2 – Consumo REST API

Para poder calcular la ruta requerida por el usuario es necesario acceder a los vuelos asociados a VIAJE POR COLOLMBIA, para este propósito se provee de una API que permita realizar la búsqueda de estos. Consuma la siguiente API (https://bitecingcom.ipage.com/testapi/) usando el método GET y use la clase Flight modelada en el Problema 1 para mapear la respuesta.



#### SOLUCION

En mi caso, use la api diseñada para rutas múltiples y de retorno -> https://bitecingcom.ipage.com/testapi/avanzado.js

El consumo de la api se encuentra en la carpeta "helpers" con el nombre de "getFlights.js"

En el código se encuentra una explicación mas a detalle



---

### Problema 3 – Obtener Ruta

Se debe exponer un API en la cual el usuario pueda pasar sus parámetros de búsqueda.



#### SOLUCION

RUTA -> http://localhost:10000/api/search/:origin/:destination 



#### EJEMPLO DE USO

- ingresamos la siguente url -> http://localhost:10000/api/search/CUC/BTA
- **CUC** es el lugar de origen, **BTA** es el lugar de destino

Al ingresar esta ruta debería mandar la siguiente respuesta (rutas múltiples y de retorno)

```json
  {
    "Journey": {
      "database": false,
      "origin": "CUC",
      "destination": "BTA",
      "price": 2200,
      "flights": [
        {
          "transport": {
            "flightCarrier": "AV",
            "flightNumber": "9080"
          },
          "origin": "CUC",
          "destination": "STA",
          "price": 1200
        },
        {
          "transport": {
            "flightCarrier": "AV",
            "flightNumber": "9050"
          },
          "origin": "STA",
          "destination": "BTA",
          "price": 1000
        }
      ]
    }
  },
  {
    "ReturnJourney": {
      "database": false,
      "origin": "BTA",
      "destination": "CUC",
      "price": 1200,
      "flights": [
        {
          "transport": {
            "flightCarrier": "AV",
            "flightNumber": "9070"
          },
          "origin": "BTA",
          "destination": "CUC",
          "price": 1200
        }
      ]
    }
  }
]
```

Como se puede observar, este viaje no fue sacado de la base de datos, ya que la llave "**database**" esta en **false**, este dato es clave para el siguiente ejemplo

- **recomiendo probar con otros lugares para comprobar su funcionamiento**

  

---

### Problema 4 – Persistencia/Acceso Datos

Por último, es necesario poder guardar y obtener rutas previamente consultadas. Al momento de recibir cualquier consulta verificar si la ruta ya fue calculada, si es de esta manera obtener la ruta de la BD, si no, hacer el cálculo como en todo el flujo anterior del Problema 2 y 3 y guardar el resultado en la BD



#### SOLUCION

Teniendo en cuenta la consulta del problema 3, esa consulta debería estar guardada en la base de datos, si haces otra vez esa consulta te va a dar un resultado obtenido de ahí, como comprobarlo? si la clave "**database**" esta en **true**, significa que si lo saco de ahí

Este es el ejemplo con **CUC** de origen y **BTA** de destino

```json
[
  {
    "Journey": [
      {
        "Journey": {
          "database": true,
          "origin": "CUC",
          "destination": "BTA",
          "Flights": [
            {
              "transport": {
                "flightCarrier": "AV",
                "flightNumber": "9080"
              },
              "origin": "CUC",
              "destination": "STA",
              "price": 1200
            },
            {
              "transport": {
                "flightCarrier": "AV",
                "flightNumber": "9050"
              },
              "origin": "STA",
              "destination": "BTA",
              "price": 1000
            }
          ]
        }
      }
    ]
  },
  {
    "ReturnJourney": [
      {
        "Journey": {
          "database": true,
          "origin": "BTA",
          "destination": "CUC",
          "Flights": [
            {
              "transport": {
                "flightCarrier": "AV",
                "flightNumber": "9070"
              },
              "origin": "BTA",
              "destination": "CUC",
              "price": 1200
            }
          ]
        }
      }
    ]
  }
]
```

