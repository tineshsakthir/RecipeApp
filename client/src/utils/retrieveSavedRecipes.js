import axios from "axios"
import config from "../configuration/config"

const getRecipes = async () => {
    //Even though our sever gives us the data, we cannot directly acces it as below
    // const recipe = await axios.get(`http://localhost:${config.backendPort}/recipe/`) 
    // The recipe will in the response.data
    const response = await axios.get(`http://localhost:${config.backendPort}/recipe/`) 
    return response.data ;

}

export default getRecipes