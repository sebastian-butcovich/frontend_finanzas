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
    }else{
        return "";
    }
  }
  async function updateToken()
  {
      let refresh = localStorage.getItem("refresh");
      let access = localStorage.getItem("access")
      response = await refreshToken(access,refresh);  
      if (response.status != 200)
        {
          return response.status
        }
        let accessA = response.data.access_token;
        if(accessA !== 403 && accessA !=="")
        {
          localStorage.setItem("refresh",refresh);
          setAccess(accessA);
          return accessA;
        }
    
    return access;
  }
  return  <AuthContext.Provider value={{getAuth,setIsAuth,getAccess,setAccess,updateToken}}>{children} </AuthContext.Provider>
}
export const  useAuth = ()=> {return useContext(AuthContext)};
