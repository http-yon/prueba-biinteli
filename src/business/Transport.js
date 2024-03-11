
//clase para simular el transporte asociado al vuelo

 /**
     * flightCarrier ->  La compañía aérea del vuelo.
     * flightNumber -> El número de vuelo.
*/
export default class Transport {
    flightCarrier;
    flightNumber;

    constructor(flightCarrier, flightNumber) {
        this.flightCarrier = flightCarrier;
        this.flightNumber = flightNumber;
    }
}