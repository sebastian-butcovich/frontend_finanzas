import axios from "axios";
import { url } from "../../url";
export async function obtenerGastos(access, data, page, otherCoins) {
  let respuesta = null;
  console.log(page);
  let jwt = "Bearer".concat(' ',access) ; 
  try {
    if ( otherCoins|| (data.monto_inicial!=0 && data.monto_final !=0) || data.tipo !="" || (data.fecha_inicio && data.fecha_fin)) {
      respuesta = await axios ({
        method: "get",
        params: { 
          "token":jwt,
          "page":page,
          monto_min: data.monto_inicial !=""? data.monto_inicial:null,
          monto_max: data.monto_final!=""? data.monto_final:null,
          tipo: data.tipo!=""? data.tipo:null,
          fecha_inicio: data.fecha_inicio!=""? data.fecha_inicio:null,
          fecha_fin: data.fecha_fin!=""? data.fecha_fin:null,
          currency: data.currency!=""? data.currency:null,
          currency_type: data.currency_type!=""? data.currency_type:null,
          criterion: "last_updated_on_max",
          page_size: 5,
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
          page_size: 5,
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
  console.log('como se ve access desde getTotalGastos', access)
  try {
    if (filter.currency != "" &&  otherCoins) {
      responseGastos = await axios({
        method: "get",
        params: { 
          "token": jwt,currency: 
          filter.currency,
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
  fechas,
  filter,
  otherCoins
) {
  let response = null;
  let jwt = "Bearer ".concat(access);
  try {
    if (otherCoins && filter.currency != "") {
      response = await axios({
        method: "put",
        url: `${url}spent/totalGraphics`,
        params: {
          token:jwt,
          currency:filter.currency,
          currency_type:filter.currency_type
        },
        data:fechas
      });
    } else {
      response = await axios({
        method: "put",
        url: `${url}spent/totalGraphics`,
        params: {
          "token": jwt,
        },
        data:fechas
      });
    }
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
