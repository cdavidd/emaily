import axios from "axios";
import { FETCH_USER } from "./types";

//devolver una accion que se envia a todos los reducers de nuestra aplicacion
//creador de acciones
//7.84
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
