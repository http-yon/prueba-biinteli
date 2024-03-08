import axios from "axios";

export const getApiData = async () => {
    try {
        const response = await axios.get('https://bitecingcom.ipage.com/testapi/basico.js')
        const contenidoJS = response.data;

        //error de json -> quiitamos las comas de price
        const dataReplace = contenidoJS.replace(/0,/g, "0");
        let x = JSON.parse(dataReplace)
        return x

    } catch (error) {
        console.log(error);
        return []
    }
}