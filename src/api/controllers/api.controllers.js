import { findFlights } from "../../helpers/findFligths.js";

export const searchData = async (req, res) => {
    try {
        const { origin, destination } = req.params;

        let journey = {
            origin,
            destination,
            Price: 0,
            Flights: []
        };

        let returnJourney = {
            origin: destination,
            destination: origin,
            price: 0,
            flights: []
        };

        let currentLocation = origin;
        while (currentLocation !== destination) {
            const nextFlight = await findFlights(currentLocation, destination);

            if (!nextFlight) {
                journey =  "no se encuentran rutas de vuelo";
                break
            }

            journey.Flights.push(nextFlight);

            currentLocation = nextFlight.destination;

            journey.Price += nextFlight.price;
        }

        currentLocation = destination;
        while (currentLocation !== origin) {
            const nextFlight = await findFlights(currentLocation, origin);
            
            if (!nextFlight) {
                returnJourney = "no se encuentran rutas de vuelo";
                break
            }

            returnJourney.flights.push(nextFlight);

            currentLocation = nextFlight.destination;

            returnJourney.price += nextFlight.price;
        }


        res.json([{ Journey: journey },{ReturnJourney: returnJourney}]);
    } catch (error) {
        console.error(error);
        res.status(200).json({ error: "Error en el servidor." });
    }
};
