import axios from "axios";
import { url } from "../../url";
export async function refreshToken(refresh_token)
{
    try{
        const response = await axios({
            method:"post",
            url:`${url}auth/refresh`,
            params:{
                "token":"Bearer ".concat(refresh_token)
            }
        })
        console.log("esto pasa y no lo otro",response.data.access_token);
        return response.data.access_token;
    }catch(error)
    {
        console.log("Erro en la petición auth",error.response.status);
        return error.response.status;
    }
}
export async function isValidateToken(token)
{
    try{
        let response = await axios({
            method:"get",
            url:`${url}auth/validate`,
            params:{
                "token":token
            }
        })
        return response;
    }catch(error)
    {
        return error.response;
    }
}