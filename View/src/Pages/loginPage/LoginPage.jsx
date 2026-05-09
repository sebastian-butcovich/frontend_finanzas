import style from "./loginPage.module.css";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Auth/AuthProvider";
import { url } from "../../url";
import Cookies from "universal-cookie";
import { isValidateToken } from "../../utils/requests/peticionAuth";
function LoginPage() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    verificarPermiso();
  }, []);
  async function verificarPermiso() {
    //Obtengo el acces
    let access = localStorage.getItem("access");
    let response = await isValidateToken(access);
    if (response.status == 500 || response.data == 0 ) {
      let refresh = localStorage.getItem("refresh")
      response = await auth.updateToken()
      console.log("Respuesta refresh:", response)
      if(response.status == 200){
        localStorage.setItem("access",response.data.access_token)
        localStorage.setItem("refresh",response.data.refresh_token)
      }else{
        //localStorage.clear();
        navigate("/");
      }
    }
    console.log("Ultima respuesta: ",response)
    if (response.data ==1 || response.status == 200) {
      auth.setIsAuth(true);
      navigate("/dashboard");
    }
  }
  function obtenerPermiso() {
    axios({
      method: "post",
      url: `${url}auth/login`,
      data: {
        email: name,
        password: pass,
      },
    })
      .then((resp) => {
        login(resp);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }

  function login(response) {
    console.log("respuesta de un logueo ", response);
    if (response.status == 200) {
      setError(false);
      auth.setIsAuth(true);
      auth.setAccess(response.data.access_token);
      localStorage.setItem("refresh", response.data.refresh_token);
      localStorage.setItem("access", response.data.access_token);
      let data = response.data;
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);
      localStorage.setItem("surname", data.surname);
      localStorage.setItem("firstname", data.firstname);
      localStorage.setItem("lastname", data.lastname);
      localStorage.setItem("foto",data.foto)
      localStorage.setItem("dineroActual",data.dineroActual)
      navigate("/dashboard");
    } else {
      setError(true);
      navigate("/");
    }
  }
  function handleName(e) {
    setName(e.target.value);
  }
  function handlePass(e) {
    setPass(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  function llevarARegistros() {
    navigate("/register");
  }
  if (auth.isAuth) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className={style.content_loginPage}>
        <div className={style.loginPage}>
          <div className={style.content_form}>
            <div className={style.content_title}>
              <h1 className={style.loginPage_title}>Login</h1>
            </div>
            <form className={style.form} onSubmit={handleSubmit}>
              <input
                className={style.input_login}
                type="text"
                name="username"
                onChange={(e) => handleName(e)}
                placeholder="email"
              ></input>
              <input
                className={style.input_login}
                type="password"
                name="password"
                onChange={(e) => handlePass(e)}
                placeholder="password"
              ></input>
              <div className={style.contenedor_botones}>
                <button
                  className={style.boton_login}
                  type="submit"
                  variant="primary"
                  onClick={obtenerPermiso}
                >
                  Ingresar
                </button>
                <button
                  onClick={llevarARegistros}
                  className={style.boton_login}
                >
                  Registrarse
                </button>
              </div>
            </form>
            {error && (
              <p className={style.login_mensaje}>
                Los datos ingresados no son validos
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;
