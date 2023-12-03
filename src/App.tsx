import { useState, useEffect } from 'react'
import './App.css'
import { useAuth0 } from "@auth0/auth0-react";
import { Sidebar } from './components/app/Sidebar';

// if there is a typescript error at auth0 import, run: 
// 'npm uninstall @auth0/auth0-react'
// 'npm i @auth0/auth0-react'

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
      <Sidebar />
    </>
  )
}

export default App
