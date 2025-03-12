import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./defaultPage.module.css";
import iconUser from "./../../assets/avatar_png.png";
import { useAuth } from "../../Auth/AuthProvider";
import eye from "./../../assets/show.png";
import not_eye from "./../../assets/not_show.png";
import { useNavigate } from "react-router-dom";
import { CardsContext } from "../../utils/context/CardsProvider";
import { PaginadoContext } from "../../utils/context/PaginadoProvider";
import Swal from "sweetalert2";
import { eliminarUsuario } from "../../utils/requests/peticionesUsuarios";
function DefaultPage({ children }) {
  const [isMenu, setIsMenu] = useState(false);
  const context = useContext(CardsContext);
  const auth = useAuth();
  const pag = useContext(PaginadoContext);
  const navigate = useNavigate();

  function borrarCredenciales() {
    localStorage.clear();
    auth.setIsAuth(false);
    navigate("/");
  }
  function handleViewSaldo() {
    context.isViewSaldo
      ? context.setIsViewSaldo(false)
      : context.setIsViewSaldo(true);
  }
  function handleSelectLink(e) {
    switch (e) {
      case "Dashboard":
        pag.setDashboard((previus) => !previus);
        pag.setGastos(false);
        pag.setIngresos(false);
        break;
      case "Gastos":
        pag.setGastos(true);
        pag.setDashboard(false);
        pag.setIngresos(false);
        break;
      case "Ingresos":
        pag.setIngresos(true);
        pag.setDashboard(false);
        pag.setGastos(false);
        break;
    }
  }
  function handleDeleteUser(){
    console.log("Mostra")
    Swal.fire({
      title:"Confirmar",
      text:"Estas seguro que deseas eliminar tu usuario de la aplicación finanzas",
      icon:"question",
      cancelButtonText:"Cancelar",
      showCancelButton:true,
      cancelButtonColor:"red",
    }).then(async (e)=>{
        if(e.isConfirmed)
        {
          let response = await eliminarUsuario(auth.getAccess());
          if(response.status != 200)
          { 
            Swal.fire({
              title:"Operación fallida",
              text:"Ocurrio un error mientras se realizaba la operación. Vamos a estar trabajando en la solución",
              icon:"info"
            })
          }else
          {
            Swal.fire({
              title:"Operación exitosa",
              text:"El usuario se elimino correctamente",
              icon:"success"
            }).then((e)=>{
              if(e.isConfirmed)
              {
                localStorage.clear();
                navigate("/");
              }
            })
          }
        }
    })
  }
  return (
    <div className={style.container}>
      <header className={style.header_container}>
        <h1 className={style.titulo_principal}>Aplicación Finanzas</h1>
        <nav className={style.nav_container}>
          <ul className={style.barra_navegacion_links}>
            <Link
              className={
                pag.dashboard ? style.navBar_link_select : style.navBar_link
              }
              onClick={(e) => {
                handleSelectLink(e.target.text);
              }}
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className={
                pag.gastos ? style.navBar_link_select : style.navBar_link
              }
              onClick={(e) => {
                handleSelectLink(e.target.text);
              }}
              to="/gastos"
            >
              Gastos
            </Link>
            <Link
              className={
                pag.ingresos ? style.navBar_link_select : style.navBar_link
              }
              onClick={(e) => {
                handleSelectLink(e.target.text);
              }}
              to="/ingresos"
            >
              Ingresos
            </Link>
          </ul>
        </nav>
        <div className={style.dataUser}>
          {context.isViewSaldo ? (
            <img
              className={style.icon_saldo}
              src={eye}
              onClick={() => {
                handleViewSaldo();
              }}
            />
          ) : (
            <img
              className={style.icon_saldo}
              src={not_eye}
              onClick={() => {
                handleViewSaldo();
              }}
            />
          )}
          <span className={style.userName}>{localStorage.getItem("user")}</span>
          <div className={style.container_userMenu}>
            <img
              src={localStorage.getItem("foto")? localStorage.getItem("foto"):iconUser}
              alt="Foto o imagen del usuario"
              className={style.user_image}
              onClick={() => {
                isMenu ? setIsMenu(false) : setIsMenu(true);
              }}
            />
            {isMenu ? (
              <div className={style.userMenu}>
                <a className={style.button_deslog} onClick={()=>{navigate("/editarPerfil")}}>Editar usuario</a>
                 <a className={style.button_deslog} onClick={borrarCredenciales}>
                  Desloguearse
                </a>
                <a className={style.button_deslog_eliminar} onClick={handleDeleteUser}>Eliminar usuario</a>
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <main className={style.principal}>{children}</main>
      <footer className={style.footer_container}>
        <h3>Aplicacion Finanzas</h3>
        <p className={style.footer_text_autores}>Autores: Brian Garat y Sebastián Butcovich</p>
      </footer>
    </div>
  );
}

export default DefaultPage;
