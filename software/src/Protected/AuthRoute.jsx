import React from "react";  
import { Navigate, Outlet } from "react-router-dom";   
   
const AuthRoute = () => {  
  return !localStorage.getItem("userId") ? <Outlet /> : <Navigate to={"/studentlist"} />;  
  
};     

export default AuthRoute;
