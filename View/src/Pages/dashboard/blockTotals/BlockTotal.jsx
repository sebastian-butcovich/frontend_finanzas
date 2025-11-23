import  { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../Auth/AuthProvider";
import style from "./blockTotals.module.css";
import { getTotalsGasto } from "../../../utils/requests/peticionGastos";
import { getTotalIngresos } from "../../../utils/requests/peticionesIngresos";
import { FilterContext } from "../../../utils/context/FilterProvider";
import { CardsContext } from "../../../utils/context/CardsProvider";
import asterisco from "./../../../assets/asterisco.png";
import { obtenerUsuarioLogeado } from "../../../utils/requests/peticionesUsuarios";
import { actualizarValorActual } from "../../../utils/requests/peticionesUsuarios";
import Swal from "sweetalert2";
function BlockTotal() {
  const [totals, setTotals] = useState({
    total:0,
    gastos: 0,
    ingresos: 0,
    cotizacion: "",
  });
  const[modifyActual,setModifyActual] = useState(false);
  const auth = useAuth();
  const context = useContext(CardsContext);
  const filter = useContext(FilterContext);
  async function getTotals() {
      let access = auth.getAccess();
      if(access == "")
      {
        access = await auth.updateToken();
      }
      let gastos = await getTotalsGasto(
        access,
        filter
      );
      if( gastos == null || gastos == undefined)
      {
        access = await auth.updateToken();
         gastos = await getTotalsGasto(
          access,
          filter
        );
      }
      let ingresos = await getTotalIngresos(
        access,
        filter
      );
      let datosUsuario = await obtenerUsuarioLogeado(access,filter.getDataFilter().currency,filter.getDataFilter().currency_type);
      setTotals({
        ...totals,
        gastos: gastos.data.value,
        ingresos: ingresos.data.value,
        cotizacion: gastos.data.moneda,
        total:datosUsuario.data.actual
      });
    }      
    function handleEstadoValorActual(){
      setModifyActual(!modifyActual);
    }
    function handleValorActual(event){
      setTotals({
        ...totals,
        total:event.target.valueAsNumber
      })
    }
    function setValorActual(){
      if(totals.total == null || totals.total < 0){
        Swal.fire({
          title:"Error actualizando el valor actual",
          text:"No  se puede actualizar porque se envío un valor invalido",
        })
      }else{
        let access = auth.getAccess();
        if(access == ""){
          access = auth.updateToken();
        }
        actualizarValorActual(auth.getAccess(),totals.total)
        setModifyActual(false);
      }
    }
  useEffect(() => {
    getTotals();
    context.setIsUpdate(false);
  }, [context.isUpdate]);
  return (
    <div className={style.container_value_totals}>
        <div className={style.container_internal_totals}>
          <div className={style.cotainer_text_value_actual}>
            <p className={style.text_total_gastado}>Valor actual:</p>
            {modifyActual? 
            <div className={style.contendor_del_modificador}><input className={style.input_valor_actual}  type="number" value={totals.total} onChange={(event)=>{handleValorActual(event)}}/>
            <button className={style.boton_modificar} onClick={()=>{setValorActual()}}>Modificar</button>
            <button className={style.boton_esconder} onClick={()=>{handleEstadoValorActual()}}>Esconder</button></div>:
            <p className={style.valor_actual} onClick={()=>{handleEstadoValorActual()}}>{Intl.NumberFormat("ES-AR")
            .format(totals.total)} {totals.cotizacion}</p>}
        </div>
        <div className={style.container_totals}>
          <span className={style.text_total_gastado}>Total Gastado: </span>
          {context.isViewSaldo ? (
            <p className={style.valor_total_gastado}>
              {Intl.NumberFormat("ES-AR").format(totals.gastos)} {totals.cotizacion}
            </p> 
          ) : (
            <div className={style.container_asterisco}>
              <img className={style.icons_saldo} src={asterisco} />
              <img className={style.icons_saldo} src={asterisco} />
              <img className={style.icons_saldo} src={asterisco} />
            </div>
          )} 
          <span className={style.text_total_ingresado}>Total Ingresado: </span>
          {context.isViewSaldo ? (
            <p className={style.valor_total_ingresado}>
              {Intl.NumberFormat("ES-AR").format(totals.ingresos)} {totals.cotizacion}
            </p>
          ) : (
            <div className={style.container_asterisco}>
              <img className={style.icons_saldo} src={asterisco} />
              <img className={style.icons_saldo} src={asterisco} />
              <img className={style.icons_saldo} src={asterisco} />
            </div>
          )}
        </div>
        </div>
    </div>
  );
}

export default BlockTotal;
