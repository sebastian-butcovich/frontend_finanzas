import axios from "axios";
import { url } from "../../url";
export async function obtenerFlows(token)
{
    let jwt = "Bearer ".concat(token);
    try{
        let response = await axios({
            method:"GET",
            url:`${url}flow/list`,
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
export async function agregarFlow(token,flow){
    let jwt = "Bearer ".concat(token);
    try{
        let response = await axios({
            method:"POST",
            url:`${url}flow/add`,
            params:{
                "token":jwt,
            },
            data:{
                nombreDelAdeudado:flow.nombre,
                monto:flow.monto,
                estado:flow.estado,
                tipo:flow.tipo,
                fecha:flow.fechaIngreso,
                fechaEstimadaDePago:flow.fechaEstimada,
                valorDelDolar:flow.valorDelDolar
            }
        })
        return response;
    }catch(error){
        console.log(error);
        return error.response;
    }
}
export async function editarFlow(token,flow){
    let jwt = "Bearer ".concat(token);
    try{
        let response = await axios({
            method:"PUT",
            url:`${url}flow/edit`,
            params:{
                "token":jwt
            },
            data:{
                id:flow.id,
                nombreDelAdeudado:flow.nombre,
                monto:flow.monto,
                estado:flow.estado,
                tipo:flow.tipo,
                fecha:flow.fechaIngreso,
                fechaEstimadaDePago:flow.fechaEstimada,
                valorDelDolar:flow.valorDelDolar
            }
        })
        return response;
    }catch(error){
        console.log("Error en editar un future-flow",error )
        return error.response;
    }
}