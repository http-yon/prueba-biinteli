import { findPreviousSearches } from "../../dataAccess/findPreviousSearches.js";
import { postPreviousSeach } from "../../dataAccess/postPreviousSeach.js";
import { findFlights } from "../../helpers/findFligths.js";

export const searchData = async (req, res) => {
    try {
        let { origin, destination } = req.params;


        let journey = {
            database: false,
            origin,
            destination,
            price: 0,
            flights: []
        };

        let returnJourney = {
            database: false,
            origin: destination,
            destination: origin,
            price: 0,
            flights: []
        };

        let currentLocation = origin;
        //verificar si la busqueda no esta en la base de datos
        const previousSearchesJourney = await findPreviousSearches(currentLocation, destination)

        
        while (currentLocation !== destination) {

            if (previousSearchesJourney) {
                journey = previousSearchesJourney          
                break  
            }

            const nextFlight = await findFlights(currentLocation, destination);

            if (!nextFlight) {
                journey = "no se encuentran rutas de vuelo";
                break
            }

            journey.flights.push(nextFlight);

            currentLocation = nextFlight.destination;

            journey.price += nextFlight.price;
        }

        currentLocation = destination;

        const previousSearchesPostJourney = await findPreviousSearches(currentLocation, origin)

        while (currentLocation !== origin) {
            
            if (previousSearchesPostJourney) {
                returnJourney = previousSearchesPostJourney
                break
            }

            const nextFlight = await findFlights(currentLocation, origin);

            if (!nextFlight) {
                returnJourney = "no se encuentran rutas de vuelo";
                break
            }

            returnJourney.flights.push(nextFlight);

            currentLocation = nextFlight.destination;

            returnJourney.price += nextFlight.price;
        }

        if (journey.database === false) {
            await postPreviousSeach(journey)
        }

        if (returnJourney.database === false) {
            await postPreviousSeach(returnJourney)
        }

    
        res.json([{ Journey: journey }, { ReturnJourney: returnJourney }]);

    } catch (error) {
        console.error(error);
        res.status(200).json({ error: "Error en la busqueda" });
    }
};
