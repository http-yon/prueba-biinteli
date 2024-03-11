//importamos los modelos
import { FlightModel } from "./models/flightSchema.js";
import { JourneyModel } from "./models/journeySchema.js";
import { TransportModel } from "./models/transportSchema.js";

//funcion para postear la nueva busqueda
const postPreviousSeach = async (journeyData) => {

    //creamos un nuevo modelo de journey
    const journey = new JourneyModel({
        origin: journeyData.origin,
        destination: journeyData.destination,
        price: journeyData.price
    });

    //mapeamos los vuelos que tenga el nuevo post para crear un nuevo modelo para cada uno
    const journeyFlights = journeyData.flights.map(async flightData => {

        //buscamos si ese vuelo ya esta en la db para no repetir datos
        const findflight = await FlightModel.findOne({
            origin: flightData.origin,
            destination: flightData.destination
        })

        //si esta en la db, solo retornar el _id
        if (findflight) {
            return findflight._id
        } else {
            //si no esta en la db crear un nuevo modelo de vuelos
            const flight = new FlightModel({
                origin: flightData.origin,
                destination: flightData.destination,
                price: flightData.price
            });

            //buscamos si el transporte del modelo esta en la db
            const findtransport = await TransportModel.findOne({
                flightCarrier: flightData.transport.flightCarrier,
                flightNumber: flightData.transport.flightNumber
            });

            //si hay coincidencias, solo retornar el _id 
            if (findtransport) {
                flight.transport.push(findtransport._id);
            } else {
                //si no, crear un nuevo modelo con los anteriores valores
                const newTransport = new TransportModel({
                    flightCarrier: flightData.transport.flightCarrier,
                    flightNumber: flightData.transport.flightNumber
                });
                //guardar el trasporte en la db
                await newTransport.save();
                //pushear el trasnporte creado en flight.trasnsports
                flight.transport.push(newTransport._id);
            }

            //guarda el vuelo y retorna el viaje creado
            return flight.save();
        }

    });

    //esperamos a que se complete la funcion de journeyFlights
    const savedFlights = await Promise.all(journeyFlights);

    //en el modelo journey mapeamos las _id de los vuelos antes iterados
    journey.flights = savedFlights.map(flight => flight._id);

    //guardamos el viaje
    await journey.save();
}

//exportamos a funcion
export { postPreviousSeach };
