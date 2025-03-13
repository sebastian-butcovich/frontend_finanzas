import React, { useContext, useEffect } from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import BlockCoinsValue from "./blockCoins/BlockCoinsValue";
import { getValueCoins } from "../../utils/requests/getFuncionalidades";
import style from "./dashboard.module.css";
import BlockTotal from "./blockTotals/BlockTotal";
import AvaragesGraphics from "./averages/AvaragesGraphics";
import { PaginadoContext } from "../../utils/context/PaginadoProvider";

function Dashboard() {
   const pag = useContext(PaginadoContext);
   useEffect(()=>{
    pag.setDashboard(true);
    pag.setGastos(false);
    pag.setIngresos(false);
   },[])
  return (
    <div className={style.container_dashboard}>
      <DefaultPage>
        <div className={style.container_content_dashboard}>
          <div className={style.container_block}>
             <BlockCoinsValue request={getValueCoins} className={style.container_coins_value} />
            <BlockTotal/>
          </div>
          <AvaragesGraphics/>
        </div>
      </DefaultPage>
    </div>
  );
}

export default Dashboard;
