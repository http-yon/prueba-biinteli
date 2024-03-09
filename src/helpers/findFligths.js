import { getFlights } from "./getFlights.js";

export const findFlights = async (origin, destination) => {
    try {
        const allFlights = await getFlights();

        const matchingFlights = allFlights.filter(flight => flight.origin === origin);

        if (matchingFlights.length === 0) {
            return null;
        }

        const exactMatch = matchingFlights.find(flight => flight.destination === destination);
        if (exactMatch) {
            return exactMatch;
        }

        return matchingFlights[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}
