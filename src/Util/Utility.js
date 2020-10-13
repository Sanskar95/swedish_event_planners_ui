import {Redirect} from "react-router-dom";

export const rediectToHome = () =>{
    if(localStorage.getItem('role')){
      return <Redirect to='/somewhere'/>;
    }
}