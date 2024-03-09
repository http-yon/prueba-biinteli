import express from "express"

import Flight from "./src/business/Fligth.js";
import Journey from "./src/business/Journey.js";
import Transport from "./src/business/Transport.js";
import { getFlights } from "./src/helpers/getFlights.js";
import apiRouter from "./src/api/routes/api.routes.js";


const app = express()
const port = 10000



//api para las busquedas
app.use("/api", apiRouter )

/*

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

//console.log(await getFlights())
