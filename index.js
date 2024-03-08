import express from "express"

import Flight from "./src/business/Fligth.js";
import Journey from "./src/business/Journey.js";
import Transport from "./src/business/Transport.js";


const app = express()
const port = 10000

/* const transport1 = new Transport("Carrier1", "123");
const flight1 = new Flight(transport1, "Origin1", "Destination1", 100.00);

const transport2 = new Transport("Carrier2", "456");
const flight2 = new Flight(transport2, "Origin2", "Destination2", 150.00);

const journey = new Journey([flight1, flight2], "Origin1", "Destination2", 250.00);
 */


app.listen(port,()=>{
    try {
        console.log(`SERVIDOR EJECUTANDOSE EN PUERTO ${port}`);
    } catch (error) {
        console.log(error);
    }
})

