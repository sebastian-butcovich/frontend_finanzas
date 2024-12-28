import axios from "axios";
import {url} from './../../global'
export async function refreshToken(refresh_token)
{
    try{
        const response = await axios({
            method:"post",
            url:`${url}auth/refresh`,
            headers:{
                Authorization:"Bearer "+refresh_token
            }
        })
        return response.data.access_token;
    }catch(error)
    {
        console.log("Erro en la petición auth",error);
    }
}