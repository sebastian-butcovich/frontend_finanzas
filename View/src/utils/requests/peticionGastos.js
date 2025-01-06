import axios from "axios";
import {url} from './../../global'
export async function obtenerGastos(access, data, page, otherCoins) {
  let respuesta = null;
  let jwt = "Bearer".concat(' ',access) ; 
  try {
    if ( otherCoins ) {
      respuesta = await axios ({
        method: "get",
        params: { 
          "token": jwt,
          "page":page,
          monto_min: data.monto_inicial !=""? data.monto_inicial:null,
          monto_max: data.monto_final!=""? data.monto_final:null,
          tipo: data.tipo!=""? data.tipo:null,
          fecha_inicio: data.fecha_inicio!=""? data.fecha_inicio:null,
          fecha_fin: data.fecha_fin!=""? data.fecha_fin:null,
          currency: data.currency!=""? data.currency:null,
          currency_type: data.currency_type!=""? data.currency_type:null,
          criterion: "last_updated_on_max",
          page_size: 15,
         },
        url:`${url}spent/get_all`,
        
      });
    } else {
      respuesta = await axios({
        method: "get",
        params: { 
          "token":jwt,
          "page": page,
          monto_min: data.monto_inicial !=""? data.monto_inicial:null,
          monto_max: data.monto_final!=""? data.monto_final:null,
          tipo: data.tipo!=""? data.tipo:null,
          fecha_inicio: data.fecha_inicio!=""? data.fecha_inicio:null,
          fecha_fin: data.fecha_fin!=""? data.fecha_fin:null,
          page_size: 15,
          criterion: "last_updated_on_max",
         },
         url:`${url}spent/get_all`,
      });
    }
    console.log("respuesta de petición gastos",respuesta)
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
      method: "post",
      url: `${url}spent/add`,
      params: { "token": jwt },
      data: {
        monto: data.monto,
        descripcion: data.descripcion,
        tipo: data.tipo,
      },
    });
    console.log("respuesta de agregar gasto",respuesta)
    return respuesta.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}
export async function editGasto(data, access) {
  let jwt = "Bearer".concat(' ',access)
  try {
    console.log("token del editar", jwt)
    const respuesta = await axios({
      method: "post",
      url: `${url}spent/update`,
      params: { "token":jwt },
      data: {
        id: data.id,
        monto: data.monto,
        descripcion: data.descripcion,
        tipo: data.tipo,
      },
    });
    return respuesta.status;
  } catch (error) {
    return error.response.status;
    console.log(error);
  }
}
export async function removeGasto(id, access) {
  console.log(id, access);
  let jwt = "Bearer ".concat(access);
  try {
    const response = await axios({
      method: "delete",
      url: `${url}spent/delete`,
      params: { "token": jwt ,
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
      url: `${url}spent/tipos`,
      params: { "token": jwt },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function getTotalsGasto(access, filter, otherCoins) {
  let responseGastos = null;
  let jwt = "Bearer ".concat(access);
  try {
    if (filter.currency != "" && filter.currency_type != "" && otherCoins) {
      responseGastos = await axios({
        method: "get",
        params: { "token": jwt,currency: filter.currency,
          currency_type: filter.currency_type, },
        url: `${url}spent/total`,
      });
    } else {
      responseGastos = await axios({
        method: "get",
        params: { "token": jwt },
        url: `${url}spent/total`,
      });
    }
    console.log(responseGastos);
    return responseGastos;
  } catch (error) {
    console.log("Este error ocurre dentro de la petición getTotalGasto", error);
    return error.response;
  }
}
export async function getAvaragesGastos(
  access,
  fecha_inicio,
  fecha_fin,
  filter,
  otherCoins
) {
  let response = null;
  try {
    if (otherCoins && filter.currency != "" && filter.currency_type != "") {
      response = await axios({
        method: "GET",
        headers: { "x-access-token": access },
        url: `${url}gastos/total`,
        params: {
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
          currency:filter.currency,
          currency_type:filter.currency_type
        },
      });
    } else {
      response = await axios({
        method: "GET",
        headers: { "x-access-token": access },
        url: `${url}gastos/total`,
        params: {
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
        },
      });
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}
