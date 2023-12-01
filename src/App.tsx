import { useState, useEffect } from 'react'
import './App.css'
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, isAuthenticated} = useAuth0();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!isAuthenticated) {
        loginWithRedirect();
      }
    }, 2000); 
  
    return () => clearTimeout(delay);
  }, [isAuthenticated, loginWithRedirect]);

  return (
    isAuthenticated &&
    <>
    
    </>
  )
}

export default App
