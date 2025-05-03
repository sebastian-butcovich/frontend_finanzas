import axios from "axios";
import { url } from "../../url";
export async function obtenerDeudad(token)
{
    let jwt = "Bearer ".concat(token);
    try{
        let response = await axios({
            method:"GET",
            url:`${url}debts/list`,
            params:{
                "token":jwt,
                "page":1,
                "page_size":5
            }
        })
        return response;
    }catch (error){
        console.log(error);
        return error.response;
    }
}