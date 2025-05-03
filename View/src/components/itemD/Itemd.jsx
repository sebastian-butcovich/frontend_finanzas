import React, { useEffect } from 'react'

function Itemd({data}) {
  function handleChange(event){
    console.log(event)
  }
    useEffect(()=>{
    },[])
  return (
    <div data key={data.id}>
          <input type="radio" defaultChecked={data.estado} onChange={(e)=>{handleChange(e)}} />
          <p>monto {data.monto}</p>
          <p>nombre {data.nombre}</p>
          <p>dataalor del dólar al tomar la deuda: {data.valorDelDolar}</p>
    </div>
  )
}

export default Itemd
