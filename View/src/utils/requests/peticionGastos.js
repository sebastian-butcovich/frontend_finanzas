import axios, { Axios } from "axios";
import { url } from "../../url";
export async function obtenerGastos(access, page, filter) {
  let respuesta = null;
  console.log("Que llega a la petición", filter.getDataFilter().cantCards)
  let jwt = "Bearer".concat(' ',access) ; 
  try {
    if ( (filter.otherCoins && filter.getDataFilter().currency !="")|| (filter.getDataFilter().monto_inicial!=0 &&
       filter.getDataFilter().monto_final !=0) || filter.getDataFilter().tipo !="" || (filter.getDataFilter().fecha_inicio 
       && filter.getDataFilter().fecha_fin)) {
      respuesta = await axios ({
        method: "get",
        headers: { 
          "Authorization":jwt,
        }
        ,params:{
          "page":page,
          monto_min: filter.getDataFilter().monto_inicial !=""? filter.getDataFilter().monto_inicial:null,
          monto_max: filter.getDataFilter().monto_final!=""? filter.getDataFilter().monto_final:null,
          tipo: filter.getDataFilter().tipo!=""? filter.getDataFilter().tipo:null,
          fecha_inicio: filter.getDataFilter().fecha_inicio!=""? filter.getDataFilter().fecha_inicio:null,
          fecha_fin: filter.getDataFilter().fecha_fin!=""? filter.getDataFilter().fecha_fin:null,
          currency: filter.getDataFilter().currency!=""? filter.getDataFilter().currency:null,
          currency_type: filter.getDataFilter().currency_type!=""? filter.getDataFilter().currency_type:null,
          page_size: filter.getDataFilter().cantCards!=null && filter.getDataFilter().cantCards!="" &&
          filter.getDataFilter().cantCards>0?filter.getDataFilter().cantCards:5
         },
        url:`${url}gasto/get_all`,
        
      });
    } else {
      respuesta = await axios({
        method: "get",
        headers: { 
          "Authorization":jwt,
          "page": page,
          page_size: filter.getDataFilter().cantCards!=null && filter.getDataFilter().cantCards!="" &&
          filter.getDataFilter().cantCards>0?filter.getDataFilter().cantCards:5,
         },
         url:`${url}spent/get_all`,
      });
    }
    return respuesta;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
export async function setGasto(data, access) {
  try {
    let jwt = "Bearer ".concat(access);
    const respuesta = await axios({
      method: "POST",
      url: `${url}gasto`,
      data: {
        monto: data.monto,
        descripcion: data.descripcion,
        tipo: "GASTO",
        subtipo:data.tipo,
        fecha: new Date("yyyy/mm/dd hh:mm:ss")
      },
      headers:{
        "Authorization":jwt
      }
  
    });
    return respuesta.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}
export async function editGasto(data, access) {
  let jwt = "Bearer".concat(' ',access)
  try {
    const respuesta = await axios({
      method: "post",
      url: `${url}gasto/update`,
      params: { "Authorization":jwt },
      data: {
        id: data.id,
        monto: data.monto,
        descripcion: data.descripcion,
        tipo: data.tipo,
        fecha:data.fecha
      },
    });
    return respuesta.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}
export async function removeGasto(id, access) {
  let jwt = "Bearer ".concat(access);
  try {
    const response = await axios({
      method: "delete",
      url: `${url}gasto/delete`,
      headers: { "Authorization": jwt ,
        id,
      },
    });
    return response.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}
export async function obtenerTypesGastos(access) {
  let jwt = "Bearer ".concat(access);
  try {
    const response = await axios({
      method: "get",
      url: `${url}gasto/tipos`,
      headers: { "Authorization": jwt },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function getTotalsGasto(access, filter) {
  let responseGastos = null;
  let jwt = "Bearer ".concat(access);
  try {
    if (filter.getDataFilter().currency != "ars" && filter.getDataFilter().currency != "" &&  filter.otherCoins) {
      responseGastos = await axios({
        method: "get",
        headers: { 
          "Authorization": jwt,
          currency: filter.getDataFilter().currency,
          currency_type: filter.getDataFilter().currency_type, },
        url: `${url}gasto/total`,
      });
    } else {
      responseGastos = await axios({
        method: "get",
        headers: { "Authorization": jwt },
        url: `${url}gasto/total`,
      });
    }
    return responseGastos;
  } catch (error) {
    console.log("Este error ocurre dentro de la petición getTotalGasto", error);
    return error.response;
  }
}
export async function getAvaragesGastos(
  access,
  filter,
  fechas,
) {
  let response = null;
  let jwt = "Bearer ".concat(access);
  try {
    if (filter.otherCoins && filter.getDataFilter().currency != "" && filter.getDataFilter().currency != "ars") {
      response = await axios({
        method: "put",
        url: `${url}gasto/totalGraphics`,
        headers: {
          token:jwt,
          currency:filter.getDataFilter().currency,
          currency_type:filter.getDataFilter().currency_type
        },
        data:fechas
      });
    } else {
      response = await axios({
        method: "put",
        url: `${url}gasto/totalGraphics`,
        headers:{
          "Authorization": jwt,
        },
        data:fechas
      });
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
