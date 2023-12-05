import { useState, useEffect } from 'react'
import './App.css'
import { useAuth0 } from "@auth0/auth0-react";
import { Sidebar } from './components/app/Sidebar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
// if there is a typescript error at auth0 import, run: 
// 'npm uninstall @auth0/auth0-react'
// 'npm i @auth0/auth0-react'

function App() {
  //const { loginWithRedirect, isAuthenticated} = useAuth0();

  const routes = [
    {
      path: "/Dashboard",
      element: Dashboard
    },
    {
      path: "/Orders",
      element: Orders
    },
    {
      path: "/Customers",
      element: Customers
    },
    {
      path: "/Analytics",
      element: Analytics
    },
    
  ]

  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     if (!isAuthenticated) {
  //       loginWithRedirect();
  //     }
  //   }, 2000); 
  
  //   return () => clearTimeout(delay);
  // }, [isAuthenticated, loginWithRedirect]);

  return (
    // isAuthenticated && (
      <Router>
          <Sidebar />
            <Routes>
              {routes.map((route, index)=>{
                return(<Route path={route.path} element={<route.element />} key={index} />)
              })}
            </Routes>
      </Router>
  //   )
   );
}
export default App
