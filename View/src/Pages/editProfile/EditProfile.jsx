import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";
import { actualizarUsuario, obtenerUsuarioLogeado } from "../../utils/requests/peticionesUsuarios";
import style from "../register/Register.module.css";
import Swal from "sweetalert2";
function EditProfile() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    lastPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [isEqualsPassword, setIsEqualsPassword] = useState(false);
  async function obtenerQuienSoy() {
    let response = null;
    var access = auth.getAccess();
    try {
      response = await obtenerUsuarioLogeado(access);
      if (response.status == 403) {
        access = await auth.updateToken();
        response = await obtenerUsuarioLogeado(access);
      }
      let data = response.data;
      setUser({
        username: data.name,
        email: data.email,
        lastPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    obtenerQuienSoy();
  }, []);
  function handleInput(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    let response = await actualizarUsuario(auth.getAccess(),user);
    if(response.status == 403)
    {
      let access = auth.updateToken();
      response = await actualizarUsuario(access,user);
    }
    if(response.status == 200)
    {
      Swal.fire({
        title:"Operación realizada con exito",
        text:"Se edito correctamente el usuario",
        icon:"success"
      }).then((event) => {
        if(event.isConfirmed)
        {
          localStorage.clear();
          navigate("/login");
        }
      })
    }
    else if (response.status == 403){
      Swal.fire({
        title:"Error",
        text:"Algo salio mal mientras se realizaba la operación. Intente nuevamente en otro momento",
        icon:"error"
      })
    }
    else{
      Swal.fire({
        title:"Error",
        text:"Alguno de los datos no fueron ingresados o son incorrectos. Asegurese de ingresar nombre de usuario, el email registrado y la contraseña anterior correcta",
        icon:"error"
      })
    }
  }
  function handleEqualPassword() {
    if (user.newPassword != user.repeatNewPassword) {
      setIsEqualsPassword(true);
    } else {
      setIsEqualsPassword(false);
    }
  }
  return (
    <div className={style.container}>
      <div className={style.container_formulario}>
        <h1 className={style.title_formulario}>Editar Usuario</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className={style.formulario}
        >
          <div className={style.entrada}>
            <label className={style.label_form}>Nombre</label>
            <input
              className={style.input_form}
              type="text"
              value={user.username}
              name="username"
              onChange={(e) => {
                handleInput(e);
              }}
            ></input>
          </div>
          <div className={style.entrada}>
            <label className={style.label_form}>Email</label>
            <input
              className={style.input_form}
              type="emial"
              value={user.email}
              name="email"
              onChange={(e) => {
                handleInput(e);
              }}
            ></input>
          </div>
          <div className={style.entrada}>
            <label className={style.label_form}>Contraseña vieja</label>
            <input
              className={style.input_form}
              type="password"
              value={user.lastPassword}
              name="lastPassword"
              onChange={(e) => {
                handleInput(e);
              }}
            ></input>
          </div>

          <div className={style.entrada}>
            <label className={style.label_form}>Nueva contraseña </label>
            <input
              onBlur={() => {
                handleEqualPassword();
              }}
              className={style.input_form}
              type="password"
              value={user.newPassword}
              name="newPassword"
              onChange={(e) => {
                handleInput(e);
              }}
            ></input>
          </div>

          <div className={style.entrada}>
            <label className={style.label_form}>Repetir nueva contraseña</label>
            <input
              onBlur={() => {
                handleEqualPassword();
              }}
              className={style.input_form}
              type="password"
              value={user.repeatNewPassword}
              name="repeatNewPassword"
              onChange={(e) => handleInput(e)}
            ></input>
          </div>

          {isEqualsPassword && (
            <p className={style.alert_mensaje}>Las contraseñas son distintas</p>
          )}
          <div className={style.button_form_usuario}>
            <button className={style.button_f} type="submit">
              Enviar
            </button>
            <button
              className={style.button_f}
              onClick={() => {
                navigate("/");
              }}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
