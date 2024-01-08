import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return <div className="text-center mt-5"> <h1>¡Bienvenido! Has ingresado a una página segura.</h1></div>;
};