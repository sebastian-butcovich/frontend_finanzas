import React, {useState, useEffect } from 'react'
import style from "./itemD.module.css"
function Itemd({data}) {
  const[lastChange,setLastChange]=useState(data);
  function handleChange(event){
    
  }
    useEffect(()=>{
      console.log(data);
    },[])
  return (
    <div data key={data.id} className={style.container}>
          <p className={style.valueDataShort}>Nombre: {data.nombreDelAdeudado}</p>
          <p className={style.valueDataShort}>Monto $ {Intl.NumberFormat("ES-AR").format(data.monto)}</p>
          <p className={style.valueDataShort}>Valor del dólar: $ {Intl.NumberFormat("ES-AR").format(data.valorDelDolar)}</p>
          <p className={style.valueDataLong}>Fecha en que ingreso: {new Date(data.fecha).toLocaleDateString()}</p>
          <p className={style.valueDataLong}>Fehca estimada de pago: {new Date(data.fechaEstimadaDePago).toLocaleDateString()}</p>
          <p className={style.valueDataShort}>Tipo: {data.tipo}</p>
          <select className={style.valueDataShort} onChange={(e)=>handleChange(e)}>
            <option value={data.estado}>{data.estado}</option>
            {data.estado == "PAGADO"? <option value="INCONCLUSO">INCONCLUSO</option>:<option value="PAGADO">PAGADO</option>}</select>
    </div>
  )
}
export default Itemd
