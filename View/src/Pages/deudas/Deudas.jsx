import React, {useContext, useEffect, useState,} from 'react'
import DefaultPage from '../../components/defaultPage/DefaultPage'
import  { PaginadoContext } from '../../utils/context/PaginadoProvider';
import { obtenerDeudad } from '../../utils/requests/peticionesDebts';
import { useAuth } from '../../Auth/AuthProvider';
import ItemD from '../../components/itemD/Itemd';
function Deudas() {
  // Contextos o variables
  const pag = useContext(PaginadoContext);
  const auth = useAuth();
  const [deudas,setDeudas] = useState({
    length:0,
    value:[]
  });
  //Funciones
  function inicializarHeader(){
      pag.setDashboard(false);
      pag.setGastos(false);
      pag.setIngresos(false);
      pag.setDeudas(true);
  }
  async function obtenerDeudas(){
      let access = auth.getAccess();
      if(access == undefined || access == "")
      {
        access = auth.updateToken();
      }
      let response = await obtenerDeudad(access);
      console.log(response.data.movents);
      setDeudas({
        length:response.data.movents.length,
        value:response.data.movents
      })
  }
  
  //Llamado de inicio
  useEffect(()=>{
      inicializarHeader();
      obtenerDeudas();
     },[])
  //Vista
  return (
    <DefaultPage>
    <div>
        <h1>Titulo de deudas</h1>
        <a>Agregar Deuda(botón)</a>
        {deudas.length !=0? (deudas.value.map((v)=>(<ItemD key={v.id} data={v}></ItemD>))):<p>No hay nada para mostrar</p>}
    </div>
    </DefaultPage>
  )
}
export default Deudas