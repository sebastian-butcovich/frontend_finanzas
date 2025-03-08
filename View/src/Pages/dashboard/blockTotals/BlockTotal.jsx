import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../Auth/AuthProvider";
import style from "./blockTotals.module.css";
import { getTotalsGasto } from "../../../utils/requests/peticionGastos";
import { getTotalIngresos } from "../../../utils/requests/peticionesIngresos";
import { FilterContext } from "../../../utils/context/FilterProvider";
import { CardsContext } from "../../../utils/context/CardsProvider";
import asterisco from "./../../../assets/asterisco.png";
function BlockTotal() {
  const [totals, setTotals] = useState({
    gastos: 0,
    ingresos: 0,
    cotizacion: "",
  });
  const auth = useAuth();
  const context = useContext(CardsContext);
  const filter = useContext(FilterContext);
  async function getTotals() {
      let access = auth.getAccess();
      if(access == "" )
      {
        access = await auth.updateToken();
      }
      let gastos = await getTotalsGasto(
        access,
        filter.getDataFilter(),
        filter.otherCoins
      );
      if( gastos == null || gastos == undefined)
      {
        access = await auth.updateToken();
         gastos = await getTotalsGasto(
          access,
          filter.getDataFilter(),
          filter.otherCoins
        );
      }
      let ingresos = await getTotalIngresos(
        access,
        filter.getDataFilter(),
        filter.otherCoins
      );
      setTotals({
        ...totals,
        gastos: gastos.data.value,
        ingresos: ingresos.data.value,
        cotizacion: gastos.data.moneda
      });
    }      
  useEffect(() => {
    setTimeout(()=>{getTotals();},4000);
    context.setIsUpdate(false);
  }, [context.isUpdate]);
  return (
    <div className={style.container_value_totals}>
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
  );
}

export default BlockTotal;
