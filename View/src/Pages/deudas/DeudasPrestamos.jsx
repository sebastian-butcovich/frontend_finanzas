import React, { useContext, useEffect, useState } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import { PaginadoContext } from "../../utils/context/PaginadoProvider";
import {
  agregarFlow,
  obtenerFlows,
} from "../../utils/requests/peticionesFlows";
import { useAuth } from "../../Auth/AuthProvider";
import ItemD from "../../components/itemD/Itemd";
import style from "../../components/component-generic.module.css";
import Swal from "sweetalert2";
import { getValueCoins } from "../../utils/requests/getFuncionalidades";
function Deudas() {
  // Contextos o variables
  const pag = useContext(PaginadoContext);
  const auth = useAuth();
  const [addFlow, setAddFlow] = useState(false);
  const [flows, setFlows] = useState({
    length: 0,
    value: [],
  });
  //Estado que guarda la información de la deuda que se va a agregar
  const [flowAdd, setFlowAdd] = useState({
    id: null,
    estado: "INCONCLUSO",
    tipo: "DEUDA",
    monto: 0,
    nombre: "",
    valorDelDolar: 0,
    fechaIngreso: "",
    fechaEstimada: "",
  });
  //Funciones
  function handleChangeInput(e) {
    console.log(e.target.name);
    setFlowAdd({
      ...flowAdd,
      [e.target.name]: e.target.value,
    });
  }
  function handleAddFlow() {
    setAddFlow(!addFlow);
  }
  function inicializarHeader() {
    pag.setDashboard(false);
    pag.setGastos(false);
    pag.setIngresos(false);
    pag.setDeudas(true);
  }
  async function obtenerDeudas() {
    let access = auth.getAccess();
    if (access == undefined || access == "") {
      access = auth.updateToken();
    }
    let response = await obtenerFlows(access);
    console.log(response.data.movents);
    setFlows({
      length: response.data.movents.length,
      value: response.data.movents,
    });
  }
  function AgregarDeuda() {
    if (auth.getAccess() == "") {
      auth.updateToken();
    }
    let access = auth.getAccess();
    let response = agregarFlow(access, flowAdd);
    if (response.status == 200) {
      Swal.fire({
        title: "Flow agregado correctamente",
      });
    } else {
      Swal.fire({
        title: "No se agrego",
      });
    }
  }
  //Obtiene el valor del dalor
  async function obtenerElValorDelDolar(){
    let response = await getValueCoins();
    console.log(response);
     setFlowAdd({
       ...flowAdd,
       valorDelDolar:response[1].venta
     })
  }
  //Llamado de inicio
  useEffect(() => {
    inicializarHeader();
    obtenerDeudas();
    obtenerElValorDelDolar();
  }, []);
  //Vista
  return (
    <DefaultPage>
      <div className={style.container}>
        <div className={style.container_button_add}>
          <a
            className={style.boton_generic_add}
            onClick={() => handleAddFlow()}
          >
            Agregar Deuda/Préstamo
          </a>
        </div>
        {addFlow ? (
          <form className={style.formAdd}>
            <div className={style.rowForm}>
              <label>Nombre del adeudado</label>
              <input
                type="text"
                className={style.inputGeneric}
                value={flowAdd.nombre}
                onChange={(e) => handleChangeInput(e)}
                name="nombre"
              />
            </div>
            <div className={style.rowForm}>
              <label>Monto</label>
              <input
                type="number"
                max="10000000"
                className={style.inputGeneric}
                value={flowAdd.monto}
                onChange={(e) => handleChangeInput(e)}
                name="monto"
              />
            </div>
            <div className={style.rowForm}>
              <label>Fecha que realizo el movimiento</label>
              <input
                type="date"
                className={style.inputGeneric}
                value={flowAdd.fechaIngreso}
                onChange={(e) => handleChangeInput(e)}
                name="fechaIngreso"
              />
            </div>
            <div className={style.rowForm}>
              <label>Fecha estimada para terminar el movimiento</label>
              <input
                type="date"
                className={style.inputGeneric}
                value={flowAdd.fechaEstimada}
                onChange={(e) => handleChangeInput(e)}
                name="fechaEstimada"
              />
            </div>
            <div className={style.rowForm}>
              <label>Estado</label>
              <select
                className={style.inputGeneric}
                name="estado"
                onChange={(e) => handleChangeInput(e)}
              >
                <option value="">Seleccione el estado</option>
                <option  value="INCONCLUSO">
                  Inconcluso
                </option>
                <option value="PAGADO">Pagado</option>
              </select>
              <label>Estado</label>
              <select
                className={style.inputGeneric}
                name="tipo"
                onChange={(e) => handleChangeInput(e)}
              >
                <option value="">Seleccione el tipo</option>
                <option  value="DEUDA">
                  Deuda
                </option>
                <option value="PRESTAMO">Prestamo</option>
              </select>
            <div className={style.rowForm}>
              <label>Valor del dólar</label>
              <a className={style.textForm} >{Intl.NumberFormat("ES-AR").format(flowAdd.valorDelDolar)}</a>
            </div>
            </div>
            <a className={style.button_enviar} onClick={() => AgregarDeuda()}>
              Enviar
            </a>
            <a className={style.button_volver} onClick={() => handleAddFlow()}>
              Volver
            </a>
          </form>
        ) : null}
        {flows.length != 0 ? (
          flows.value.map((v) => <ItemD key={v.id} data={v}></ItemD>)
        ) : (
          <p className={style.centerText}>No hay nada para mostrar</p>
        )}
      </div>
    </DefaultPage>
  );
}
export default Deudas;
