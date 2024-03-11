//importamos findPreviousSearches -> busca si se encuentra la solicitud en la base de datos
import { findPreviousSearches } from "../../dataAccess/findPreviousSearches.js";

//importamos postPreviousSeach -> manda la nueva solicitud a la base de datos 
import { postPreviousSeach } from "../../dataAccess/postPreviousSeach.js";

//importamos findFlights -> busca los vuelos que coincidan con el origen o destino de la solicitud acual
import { findFlights } from "../../helpers/findFligths.js";

//fucnion para crear la rutas multiples y de retorno
export const searchData = async (req, res) => {
    try {
        //traemos los parametros
        let { origin, destination } = req.params;

        //estructura para journey / ruta de ida
        let journey = {
            database: false,
            origin,
            destination,
            price: 0,
            flights: []
        };

        //estructura para returnJourney / ruta de retorno
        let returnJourney = {
            database: false,
            origin: destination,
            destination: origin,
            price: 0,
            flights: []
        };


        /* ---BUSQUEDA DE JOURNEY--- */

        //la localizacion actual a buscar es origin(parametro que mando el usuario)
        let currentLocation = origin;

        //verificar si la busqueda esta en la base de datos
        const previousSearchesJourney = await findPreviousSearches(currentLocation, destination)

        //mientras la localizacion actual no sea igual a el destino final, ejecuta esto
        while (currentLocation !== destination) {

            //si la funcion encontro un valor la devuelvelo y rompe el ciclo
            if (previousSearchesJourney) {
                journey = previousSearchesJourney
                break
            }

            //busca vuelos con la localizacion actual
            const nextFlight = await findFlights(currentLocation, destination);

            //si no hay resultados devolver respuestay romper ciclo
            if (!nextFlight) {
                journey = "no se encuentran rutas de vuelo";
                break
            }

            //pusheamos el vuelo a la estructura de arriba 
            journey.flights.push(nextFlight);

            //cambiamos la localizacion actual al destino del ultimo vuelo
            currentLocation = nextFlight.destination;

            //sumamos los precios
            journey.price += nextFlight.price;
        }

        /* ---BUSQUEDA DE RETURNJOURNEY--- */
        //lo mismo pero al contrario

        //la localizacion actual a buscar es destination(parametro que mando el usuario)
        currentLocation = destination;

        //verificar si la busqueda esta en la base de datos
        const previousSearchesPostJourney = await findPreviousSearches(currentLocation, origin)

        //mientras la localizacion actual no sea igual a el destino de origen, ejecuta esto
        while (currentLocation !== origin) {

            //si la funcion encontro un valor la devuelvelo y rompe el ciclo
            if (previousSearchesPostJourney) {
                returnJourney = previousSearchesPostJourney
                break
            }

            //busca vuelos con la localizacion actual
            const nextFlight = await findFlights(currentLocation, origin);

            //si no hay resultados devolver respuestay romper ciclo
            if (!nextFlight) {
                returnJourney = "no se encuentran rutas de vuelo";
                break
            }

            //pusheamos el vuelo a la estructura de arriba 
            returnJourney.flights.push(nextFlight);

            //cambiamos la localizacion actual al destino del ultimo vuelo
            currentLocation = nextFlight.destination;

            //sumamos los precios
            returnJourney.price += nextFlight.price;
        }

        //si el valor de database esta en falso significa que no se saco de la base de datos

        //si se cumple el valor en ambos casos, mandar la respuesta a la base de datos
        if (journey.database === false) {
            await postPreviousSeach(journey)
        }

        if (returnJourney.database === false) {
            await postPreviousSeach(returnJourney)
        }


        //mandamos la respuesta
        res.json([{ Journey: journey }, { ReturnJourney: returnJourney }]);

    } catch (error) {
        console.error(error);
        res.status(200).json({ error: "Error en la busqueda" });
    }
};
