import axios from "axios";
import { url } from "../../url";
export async function obtenerUsuarioLogeado(access)
{
    let jwt = "Bearer ".concat(access);
    try{
        const response = await axios({
            method:"GET",
            url:`${url}users/whoami`,
            params:{
                "token": jwt,
            },
        })
        return response;
    }catch(error)
    {
        console.log(error);
        return error.response;
    }
}
export async function actualizarUsuario(access, data)
{
    var response = null;
    let jwt = "Bearer ".concat(access)
    try{
        response = await axios({
            method:"PUT",
            url:`${url}users/update`,
            params:{
                "token":jwt,
            },
            data:{
                name:data.username,
                email:data.email,
                oldPassword:data.lastPassword,
                newPassword:data.newPassword,
                foto:data.picture
            }
        })
    return response;
    }catch(error)
    {
        console.log(error)
        return error.response;
    }
}
export async function eliminarUsuario(token)
{
    let jwt = "Bearer ".concat(token);
    let response = null;
    try{
        response = await axios({
            method:"DELETE",
            url:`${url}users/delete`,
            params:{
                "token":jwt
            }
        })
    return response;
    }catch(error)
    {
        console.log(error);
        return error.response;
    }
}