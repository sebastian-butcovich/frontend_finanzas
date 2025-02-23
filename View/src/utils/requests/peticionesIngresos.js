import axios from "axios";
import {url} from './../../global'
export async function getIngresos(access, data, page, otherCoins) {
  let respuesta = null;
  console.log('esto es page dentro de peticiones ingresos',page);
  let jwt = "Bearer ".concat(access);
  try {
    if (otherCoins || (data.monto_inicial!=0 && data.monto_final !=0) || data.tipo !="" || (data.fecha_inicio && data.fecha_fin)  ) {
      respuesta = await axios({
        method: "get",
        url: `${url}income/get_all`,
        params: {
          "token": jwt ,
          page: page,
          page_size: 5,
          monto_min: data.monto_inicial != "" ? data.monto_inicial : null,
          monto_max: data.monto_final != "" ? data.monto_final : null,
          tipo: data.tipo != "" ? data.tipo : null,
          fecha_inicio: data.fecha_inicio != "" ? data.fecha_inicio : null,
          fecha_fin: data.fecha_fin != "" ? data.fecha_fin : null,
          currency: data.currency != "" ? data.currency : null,
          currency_type: data.currency_type != "" ? data.currency_type : null,
          criterion: "last_updated_on_max",
        },
      });
    } else {
      respuesta = await axios({
        method: "get",
        url: `${url}income/get_all`,
        params: {
          "token": jwt ,
          page: page,
          page_size: 5,
          criterion: "last_updated_on_max",
        },
      });
    }
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    return error.response;
  }
}
export async function setIngreso(data, access) {
  let jwt = "Bearer ".concat(access);
  try {
    const respuesta = await axios({
      method: "post",
      url: `${url}income/add`,
      params:{
        "token": jwt 
      },
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
export async function editIngreso(data, access) {
  let jwt = "Bearer ".concat(access);
  try {
    const respuesta = await axios({
      method: "post",
      url: `${url}income/update`,
      params: { "token": jwt },
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
export async function removeIngreso(id, access) {
  let jwt = "Bearer ".concat(access);
  try {
    const response = await axios({
      method: "delete",
      url: `${url}income/delete`,
      params: {
        "token": jwt,
        id,
      },
    });
    return response.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}
export async function obtenerTypesIngresos(access) {
  try {
    let jwt = "Bearer ".concat(access)
    const response = await axios({
      method: "get",
      url: `${url}income/tipos`,
      params: { "token": jwt },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function getTotalIngresos(access, filter, otherCoins) {
  let responseIngresos = null;
  let jwt = "Bearer ".concat(access);
  try {
    if (filter.currency != "" && filter.currency_type != "" && otherCoins) {
      responseIngresos = await axios({
        method: "get",
        params: { "token": jwt,
          currency: filter.currency,
          currency_type: filter.currency_type,
         },
        url: `${url}income/total`,
      });
    } else {
      responseIngresos = await axios({
        method: "get",
        params: { "token": jwt },
        url: `${url}income/total`,
      });
    }
    console.log(responseIngresos);
    return responseIngresos;
  } catch (error) {
    console.log(
      "Este error ocurre dentro de la petición getTotalIngresos",
      error
    );
    return error.response;
  }
}
export async function getAvaragesIngresos(
  access,
  fecha_inicio,
  fecha_fin,
  filter,
  otherCoins
) {
  try {
    var response = null;
    var jwt = "Bearer ".concat(access)
    if (otherCoins && filter.currency != "" && filter.currency_type != "") {
      response = await axios({
        method: "GET",
        url: `${url}income/total`,
        params: {
          token:jwt,
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
          currency: filter.currency,
          currency_type: filter.currency_type,
        },
      });
    } else {
      response = await axios({
        method: "GET",
        url: `${url}income/total`,
        params: {
          token:jwt,
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
        },
      });
    }
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
