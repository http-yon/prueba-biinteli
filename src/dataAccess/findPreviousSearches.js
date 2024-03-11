import dbConection from "./database/dbConection.js";
import { JourneyModel } from "./models/journeySchema.js"
import { FlightModel } from "./models/flightSchema.js";
import { TransportModel } from "./models/transportSchema.js"

export const findPreviousSearches = async (origin, destination) => {
    try {

        await dbConection()

        const journeys = await JourneyModel.find({ origin: origin, destination: destination }).populate({
            path: 'flights',
            populate: {
                path: "transport"
            }
        });


        
        if (journeys.length === 0) {
            return null
        }

        const formattedJourneys = journeys.map(journey => ({
            Journey: {
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



        return formattedJourneys


    } catch (error) {
        console.log(error);
    }

}