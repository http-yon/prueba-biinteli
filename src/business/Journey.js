
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

