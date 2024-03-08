
import Transport from "./Transport.js";
import { getApiData } from "../helpers/getApiData.js";


export default class Flight {
    transport;
    origin;
    destination;
    price;

    constructor(transport, origin, destination, price) {
        this.transport = transport;
        this.origin = origin;
        this.destination = destination;
        this.price = price;
    }

    async getFlights() {
        try {
            
            const x = await getApiData()

            const flights = x.map(flightData => {
                                
                const transport = new Transport(flightData.FlightCarrier, flightData.FlightNumber);
                return new Flight(transport, flightData.DepartureStation, flightData.ArrivalStation, flightData.Price);
            });

            return flights;

        } catch (error) {
            console.error('Error al obtener los vuelos:', error);
            return [];
        }
    }



}
