import React, {useContext, useEffect,} from 'react'
import DefaultPage from '../../components/defaultPage/DefaultPage'
import  { PaginadoContext } from '../../utils/context/PaginadoProvider';
function Deudas() {
  const pag = useContext(PaginadoContext);
  useEffect(()=>{
      pag.setDashboard(false);
      pag.setGastos(false);
      pag.setIngresos(false);
      pag.setDeudas(true);
     },[])
  return (
    <DefaultPage>
    <div>
        <h1>Welcome to Deudas</h1>
    </div>
    </DefaultPage>
  )
}
export default Deudas