import { FlightModel } from "./models/flightSchema.js";
import { JourneyModel } from "./models/journeySchema.js";
import { TransportModel } from "./models/transportSchema.js";

const postPreviousSeach = async (journeyData) => {

    const journey = new JourneyModel({
        origin: journeyData.origin,
        destination: journeyData.destination,
        price: journeyData.price
    });

    const journeyFlights = journeyData.flights.map(async flightData => {

        const findflight = await FlightModel.findOne({
            origin: flightData.origin,
            destination: flightData.destination
        })

        if (findflight) {
            return findflight._id
        } else {
            const flight = new FlightModel({
                origin: flightData.origin,
                destination: flightData.destination,
                price: flightData.price
            });

            const findtransport = await TransportModel.findOne({
                flightCarrier: flightData.transport.flightCarrier,
                flightNumber: flightData.transport.flightNumber
            });

            if (findtransport) {
                flight.transport.push(findtransport._id);
            } else {
                const newTransport = new TransportModel({
                    flightCarrier: flightData.transport.flightCarrier,
                    flightNumber: flightData.transport.flightNumber
                });
                await newTransport.save();
                flight.transport.push(newTransport._id);
            }

            return flight.save();
        }

    });

    const savedFlights = await Promise.all(journeyFlights);

    journey.flights = savedFlights.map(flight => flight._id);

    await journey.save();
}

export { postPreviousSeach };
