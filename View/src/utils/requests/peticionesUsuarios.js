import axios from "axios";
import { url } from "../../url";
export async function obtenerUsuarioLogeado(access,currency,currency_type)
{
    let jwt = "Bearer ".concat(access);
    try{
        const response = await axios({
            method:"GET",
            url:`${url}usuarios`,
            headers:{
                "Authorization": jwt,
                //"currency":currency,
               // "currency_type":currency_type
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
    console.log("Datos del usuario para actualizar ",data)
    let jwt = "Bearer ".concat(access)
    try{
        response = await axios({
            method:"PUT",
            url:`${url}usuarios`,
            headers:{
                "Authorization":jwt,
            },
            data:{
                email:data.email,
                username:data.username,
                surname:data.surname,
                firstname:data.firstname,
                lastname:data.lastname,
                password:data.newPassword,
                dineroActual:localStorage.getItem("dineroActual"),
                foto:data.foto
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
export async function actualizarValorActual(token, valorActual){
    let jwt = "Bearer ".concat(token);
    console.log(valorActual);
    let response = null;
    try{
        response = await axios({
            method:"PUT",
            url:`${url}users/actualizarValorActual`,
            params:{
                "token":jwt,
                "valorActual":valorActual
            }
        })
    return response;
    }catch(error){
        return error.response;
    }
}