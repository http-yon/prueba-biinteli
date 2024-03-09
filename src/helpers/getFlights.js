import axios from "axios";
import Flight from "../business/Fligth.js";
import Transport from "../business/Transport.js";

export const getFlights = async () => {
    try {
        const response = await axios.get('https://bitecingcom.ipage.com/testapi/avanzado.js')
        const contenidoJS = response.data;

        //error de json -> quiitamos las comas de price
        const dataReplace1 = contenidoJS.replace(/0,/g, "0");
        const dataReplace2 = dataReplace1.slice(0,-4) + dataReplace1.slice(-1)

        let allData = JSON.parse(dataReplace2)

        const flights = allData.map(flightData => {  
            const transport = new Transport(flightData.FlightCarrier, flightData.FlightNumber);
            return new Flight(transport, flightData.DepartureStation, flightData.ArrivalStation, flightData.Price);
        });
        return flights;

    } catch (error) {
        console.log(error);
        return []
    }
}

    