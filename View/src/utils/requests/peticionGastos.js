import axios from "axios";
import { url } from "../../url";
export async function obtenerGastos(access, page, filter) {
  let respuesta = null;
  let jwt = "Bearer".concat(' ',access) ; 
  try {
    if ( (filter.otherCoins && filter.getDataFilter().currency !="")|| (filter.getDataFilter().monto_inicial!=0 &&
       filter.getDataFilter().monto_final !=0) || filter.getDataFilter().tipo !="" || (filter.getDataFilter().fecha_inicio 
       && filter.getDataFilter().fecha_fin)) {
      respuesta = await axios ({
        method: "get",
        params: { 
          "token":jwt,
          "page":page,
          monto_min: filter.getDataFilter().monto_inicial !=""? filter.getDataFilter().monto_inicial:null,
          monto_max: filter.getDataFilter().monto_final!=""? filter.getDataFilter().monto_final:null,
          tipo: filter.getDataFilter().tipo!=""? filter.getDataFilter().tipo:null,
          fecha_inicio: filter.getDataFilter().fecha_inicio!=""? filter.getDataFilter().fecha_inicio:null,
          fecha_fin: filter.getDataFilter().fecha_fin!=""? filter.getDataFilter().fecha_fin:null,
          currency: filter.getDataFilter().currency!=""? filter.getDataFilter().currency:null,
          currency_type: filter.getDataFilter().currency_type!=""? filter.getDataFilter().currency_type:null,
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
          page_size: 5,
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
      method: "post",
      url: `${url}spent/add`,
      params: { "token": jwt },
      data: {
        monto: data.monto,
        descripcion: data.descripcion,
        tipo: data.tipo,
      },
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
    console.log(error);
    return error.response.status;
  }
}
export async function removeGasto(id, access) {
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
export async function getTotalsGasto(access, filter) {
  let responseGastos = null;
  let jwt = "Bearer ".concat(access);
  try {
    if (filter.getDataFilter().currency != "args" && filter.getDataFilter().currency != "" &&  filter.otherCoins) {
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
    if (otherCoins && filter.currency != "" && filter.currency != "args") {
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
        params:{
          "token": jwt,
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
