import React, { useEffect, useContext } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import { CardsContext } from "../../utils/context/CardsProvider";
import { isValidateToken } from "../../utils/requests/peticionAuth";
import {
  getIngresos,
  removeIngreso,
  setIngreso,
  editIngreso,
  obtenerTypesIngresos,
} from "../../utils/requests/peticionesIngresos";
import { messageInfo } from "./../../utils/functions/Message";
import { useAuth } from "./../../Auth/AuthProvider";
import FilterMenu from "../../components/filterMenu/FilterMenu";
import { FilterContext } from "../../utils/context/FilterProvider";
import Cards from "../../components/cards/Cards";
import { PaginadoContext } from "../../utils/context/PaginadoProvider";
function Ingresos() {
  const context = useContext(CardsContext);
  const auth = useAuth();
  const filter = useContext(FilterContext);
  const pageContext = useContext(PaginadoContext);
  const pag = useContext(PaginadoContext);
  useEffect(() => {
    context.setType(false);
    filter.setIsFilter(false);
    context.setIsUpdate(false);
    pageContext.setPage(1);
    obtenerIngresos();
  }, [context.isUpdate, filter.getIsFilter()]);
  useEffect(() => {
    obtenerTiposIngresos();
    context.setUpdateTypes(false);
  }, [context.updateTypes]);
     useEffect(()=>{
      pag.setDashboard(false);
      pag.setGastos(false);
      pag.setIngresos(true);
     },[])
  async function obtenerTiposIngresos() {
    let access = auth.getAccess();
    let response = await obtenerTypesIngresos(access);
    if (response.status == 403) {
      access = await auth.updateToken();
      response = await obtenerTypesIngresos(access);
    }
    context.setListTypes(response.data);
  }
  async function obtenerIngresos() {
    let response = null;
    let access =  auth.getAccess();
    if(access == "")
    {
      access= await auth.updateToken();
    }
    response = await getIngresos(
      access,
      filter.getDataFilter(),
      pageContext.getPage(),
      filter.otherCoins,
    );
    context.setData(response.data.movents);
    pageContext.setPage(response.data.page);
    pageContext.setNextPage(response.data.next_page);
    pageContext.setLastPage(response.data.total_pages);
    pageContext.setTotalEntries(response.data.total_entries);
    filter.setDataFilter({
      ...filter.getDataFilter(),
      currency:response.data.additionalInfo.cotizacion,
      currency_type:response.data.additionalInfo.tipo_de_cotizacion
    })
  }
  async function handleRemove(id) {
    let response = await removeIngreso(id, auth.getAccess());
    if (response == 403) {
      let access = await auth.updateToken();
      response = await removeIngreso(id, access);
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
  }
  return (
    <DefaultPage>
      <FilterMenu></FilterMenu>
      <Cards
        data={context.data}
        handleRemove={handleRemove}
        requestEdit={editIngreso}
        requestAdd={setIngreso}
        obtenerDatos={obtenerIngresos}
      />
    </DefaultPage>
  );
}

export default Ingresos;
