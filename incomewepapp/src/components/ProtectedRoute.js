import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute ({children}){
    const auth =  useSelector((store)=> store.authReducer.isAuthenticated);
    const data  = useSelector((store)=> store.authReducer);
    console.log('protected', auth, data)
    return auth ? children : <Navigate to="/login/" />
    
        
           
    
}

export default ProtectedRoute;