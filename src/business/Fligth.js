
//clase para simular un vuelo

/**
    * transport ->  La información del transporte asociado al vuelo.
    * origin ->  El lugar de origen del vuelo.
    * destination ->  El lugar de destino del vuelo.
    * price ->  El precio del vuelo.
*/

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
}
