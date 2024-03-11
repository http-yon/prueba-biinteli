import axios from "axios";
import Flight from "../business/Fligth.js";
import Transport from "../business/Transport.js";

//funcion para obtener los vuelos con la api proporcionada
export const getFlights = async () => {
    try {
        // usamos la api de rutas multiples y de retorno / avanzado
        const response = await axios.get('https://bitecingcom.ipage.com/testapi/avanzado.js')
        const contenidoJS = response.data;

        //error de json -> quiitamos las comas de price
        const dataReplace1 = contenidoJS.replace(/0,/g, "0");
        const dataReplace2 = dataReplace1.slice(0, -4) + dataReplace1.slice(-1)
        let allData = JSON.parse(dataReplace2)

        //mapeamos la informacion con las clases de business que creamos anteriormente
        const flights = allData.map(flightData => {
            const transport = new Transport(flightData.FlightCarrier, flightData.FlightNumber);
            return new Flight(transport, flightData.DepartureStation, flightData.ArrivalStation, flightData.Price);
        });

        // Retornamos vuelos con la estructura/lógica de negocio
        console.log("vuelos obtenidos exitosamente:");
        console.log(flights);
        return flights;

    } catch (error) {
        console.error("error al obtener los vuelos:");
        console.error(error);
        return [];
    }
}    