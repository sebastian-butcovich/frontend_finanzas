import React, { useContext, useEffect } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import {
  obtenerGastos,
  editGasto,
  removeGasto,
  setGasto,
  obtenerTypesGastos,
} from "../../utils/requests/peticionGastos";
import { CardsContext } from "../../utils/context/CardsProvider";
import FilterMenu from "../../components/filterMenu/FilterMenu";
import { useAuth } from "../../Auth/AuthProvider";
import { FilterContext } from "../../utils/context/FilterProvider";
import Cards from "../../components/cards/Cards";
import { PaginadoContext } from "../../utils/context/PaginadoProvider";
import { messageInfo } from "./../../utils/functions/Message";
import { isValidateToken } from "../../utils/requests/peticionAuth";
function Gastos() {
  const context = useContext(CardsContext);
  const auth = useAuth();
  const filter = useContext(FilterContext);
  var pagContext = useContext(PaginadoContext);
  async function obtenerLosGastos() {
    try {
      let response = null;
      let access = localStorage.getItem("token");
      if(access == "")
      {
        access = auth.updateToken();
      }
      response = await obtenerGastos(
      access,
      filter.getDataFilter(),
      pagContext.getPage(),
      filter.otherCoins,);
      
      context.setData(response.data.movents);
      pagContext.setPage(response.data.page);
      pagContext.setNextPage(response.data.next_page);
      pagContext.setLastPage(response.data.total_pages);
      pagContext.setTotalEntries(response.data.total_entries);
      filter.setDataFilter({
        ...filter.getDataFilter(),
        currency:response.data.additionalInfo.cotizacion,
        currency_type:response.data.additionalInfo.tipo_de_cotizacion
      })
    } catch (mistake) {
      console.log(
        "Este error ocure en la pagina gastos, en la función obtener los gastos",
        mistake
      );
    }
  }
  async function obtenerTipos() {
    let response = null;
    try {
      let access = localStorage.getItem("token");
      response = await obtenerTypesGastos(access);
      if (response.status == 403) {
        access = await auth.updateToken();
        response = await obtenerTypesGastos(access);
      }
      context.setListTypes(response.data);
    } catch (error) {
      console.log(
        "Este error esta ocurriendo en el archvio gastos, en la función obtener tipos",
        error
      );
    }
  }
  useEffect(() => {
    pagContext.setPage(1);
    obtenerTipos();
    context.setUpdateTypes(false);
  }, [context.updateTypes]);
  useEffect(() => {
    context.setType(true);
    filter.setIsFilter(false);
    context.setIsUpdate(false);
    obtenerLosGastos();
  }, [context.isUpdate, filter.getIsFilter()]);

  async function handleRemove(id) {
    try {
      let access = localStorage.getItem("token");
      let response = await removeGasto(id, access);
      if (response == 403) {
        access= await auth.updateToken();
        response = await removeGasto(id, access);
      }
      if (response == 200) {
        messageInfo(
          "Se elimino correctamente",
          "Se elimino su gasto correctamente",
          "success"
        );
        context.setIsUpdate(true);
        context.setUpdateTypes(true);
      } else {
        messageInfo(
          "No se pudo eliminar",
          "No se pudo conectar al servidor. Espere mientras trabajamos en una solución",
          "error"
        );
      }
    } catch (mistake) {
      console.log(
        "error que ocurre en la página gastos en la función que maneja el eliminar",
        mistake
      );
    }
  }

  return (
    <div>
      <DefaultPage>
        <FilterMenu />
        <Cards
          data={context.data}
          handleRemove={handleRemove}
          requestEdit={editGasto}
          requestAdd={setGasto}
          obtenerDatos={obtenerLosGastos}
        />
      </DefaultPage>
    </div>
  );
}
export default Gastos;
