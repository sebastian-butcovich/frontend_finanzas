import axios from "axios";
import { url } from "../../url";
export async function refreshToken(access_token,refresh_token)
{
    try{
        const response = await axios({
            method:"post",
            url:`${url}auth/refresh`,
            headers:{
                "Authorization":"Bearer ".concat(access_token)
            },
            body:{
                "refreshToken": refresh_token
            }
        })
        return response;
    }catch(error)
    {
        console.log("Erro en la petición auth",error.response.status);
        return error.response;
    }
}
export async function isValidateToken(token)
{
    let myToken="Bearer ".concat(token)
    try{
        let response = await axios({
            method:"GET",
            url:`${url}auth/validate`,
            headers:{
                "Authorization":myToken
            }
        })
        return response;
    }catch(error)
    {
        return error.response;
    }
}