import React,{useContext,createContext,useState} from 'react'
import { refreshToken } from '../utils/requests/peticionAuth';
const AuthContext = createContext({})
export function AuthProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);
    const [access,setAccess] = useState("")
  function getAuth()
  {
    return isAuth;
  }
   function getAccess(){
    if(access !== "" && access !==403){
      return access;
    }
  }
  async function updateToken()
  {
    let refresh = localStorage.getItem("refresh");
    let accessA = await refreshToken(refresh);
    if(accessA !== 403 && accessA !=="")
    {
      setAccess(accessA);
      localStorage.setItem("refresh",refresh);
      console.log("retorno de accessA",accessA);
      return accessA;
    }
    console.log("segunda ejecución",access)
    return access;
  }
  return  <AuthContext.Provider value={{getAuth,setIsAuth,getAccess,setAccess,updateToken}}>{children} </AuthContext.Provider>
}
export const  useAuth = ()=> {return useContext(AuthContext)};
