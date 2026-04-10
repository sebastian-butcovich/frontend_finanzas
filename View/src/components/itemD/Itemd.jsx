import React, {useState, useEffect } from 'react'
import style from "./itemD.module.css"
import { agregarFlow, editarFlow } from './../../utils/requests/peticionesFlows';
import { useAuth } from '../../Auth/AuthProvider';
function Itemd({data}) {
  const auth = useAuth();
  const[lastChange,setLastChange]=useState(false);
  async function handleChange(event,data){
    data.estado=event.target.value;
    let token = auth.getAccess();
    if(auth == ""){
      token = auth.updateToken();
    }
    response = await editarFlow(token,data);
  }
    useEffect(()=>{
      console.log(lastChange);
      setLastChange(false)
    },[lastChange])
  return (
    <div data key={data.id} className={style.container}>
          <p className={style.valueDataShort}>Nombre: {data.nombreDelAdeudado}</p>
          <p className={style.valueDataShort}>Monto $ {Intl.NumberFormat("ES-AR").format(data.monto)}</p>
          <p className={style.valueDataShort}>Valor del dólar: $ {Intl.NumberFormat("ES-AR").format(data.valorDelDolar)}</p>
          <p className={style.valueDataLong}>Fecha en que ingreso: {new Date(data.fecha).toLocaleDateString()}</p>
          <p className={style.valueDataLong}>Fehca estimada de pago: {new Date(data.fechaEstimadaDePago).toLocaleDateString()}</p>
          <p className={style.valueDataShort}>Tipo: {data.tipo}</p>
          <select className={style.valueDataShort} onChange={(e)=>handleChange(e,data)}>
            <option value={data.estado}>{data.estado}</option>
            {data.estado == "PAGADO"? <option value="INCONCLUSO">INCONCLUSO</option>:<option value="PAGADO">PAGADO</option>}</select>
    </div>
  )
}
export default Itemd
