import { getFlights } from "./getFlights.js";

//funcion para buscar vuelos que coincidan con el origen y el destino proporcionado 
export const findFlights = async (origin, destination) => {
    try {
        //traemos los datos de la api proporcionada
        const allFlights = await getFlights();

        //filtramos por los que tengan el mismo origen
        const matchingFlights = allFlights.filter(flight => flight.origin === origin);

        //si no hay coincidencias retornamos null
        if (matchingFlights.length === 0) {
            console.log("No se encontraron vuelos con origen", origin);
            return null;
        }

        // buscamos entre la informacion filtrada de matchingFlights por vuelos que coincidan con el destino
        //si encuentra uno deja de iterar 
        const exactMatch = matchingFlights.find(flight => flight.destination === destination);

        //si se encontro un vuelo se retorna
        if (exactMatch) {
            return exactMatch;
        }

        //si no se encuentran se manda el primer valor de matchingFlights
        return matchingFlights[0];
    } catch (error) {
        console.error("error al buscar vuelos");
        console.error(error);
        return null;
    }
}
