//importamos la conexion a la db y los modelos
import dbConection from "./database/dbConection.js";
import { JourneyModel } from "./models/journeySchema.js"
import { FlightModel } from "./models/flightSchema.js";
import { TransportModel } from "./models/transportSchema.js"

// funcion para ver si la busqueda esta en la base de datos
export const findPreviousSearches = async (origin, destination) => {
    try {

        //conectamos a la db
        await dbConection()

        //buscamos un viaje que coincida coon el origen y el destino 
        const journeys = await JourneyModel.find({ origin: origin, destination: destination }).populate({
            path: 'flights',
            populate: {
                path: "transport"
            }
        });


        //si no hay coincidencias retornar null
        if (journeys.length === 0) {
            return null
        }

        //si hay resultados mapearlo con el formato propuesto
        const formattedJourneys = journeys.map(journey => ({
            Journey: {
                //esto indica que si se saco de la base de datos
                database: true,
                origin: journey.origin,
                destination: journey.destination,
                Price: journey.Price,
                Flights: journey.flights.map(flight => ({
                    transport: {
                        flightCarrier: flight.transport[0].flightCarrier,
                        flightNumber: flight.transport[0].flightNumber
                    },
                    origin: flight.origin,
                    destination: flight.destination,
                    price: flight.price
                }))
            }
        }));


        //retornamos el viaje con el formato
        return formattedJourneys    

    } catch (error) {
        console.log(error);
    }

}