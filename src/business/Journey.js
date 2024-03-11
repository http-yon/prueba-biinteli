
//clase para simular una ruta o viaje 
/**
     * flights ->  Los vuelos asociados al viaje.
     * origin ->  El lugar de origen del viaje.
     * destination ->  El lugar de destino del viaje.
     * price ->  El precio del viaje.
*/

export default class Journey {
    flight;
    origin;
    destination;
    price;

    constructor(flights, origin, destination, price) {
        this.flights = flights;
        this.origin = origin;
        this.destination = destination;
        this.price = price;
    }
}

