import { useState, useEffect } from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Sidebar } from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard.tsx";
import Customer from "./pages/dashboard/Customers.tsx";
import Orders from "./pages/dashboard/Orders.tsx";
import Analytics from "./pages/dashboard/Analytics.tsx";
import "./App.css";
import { SidebarItem } from "./components/TestSidebar.tsx";
import NewSidebar from "./components/TestSidebar.tsx";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";


// if there is a typescript error at auth0 import, run:
// 'npm uninstall @auth0/auth0-react'
// 'npm i @auth0/auth0-react'

function App() {
  // const { loginWithRedirect, isAuthenticated} = useAuth0();

  const routes = [
    {
      path: "/",
      element: Dashboard,
    },
    {
      path: "/customers",
      element: Customer,
    },
    {
      path: "/orders",
      element: Orders,
    },
    {
      path: "/analytics",
      element: Analytics,
    },
  ];

  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     if (!isAuthenticated) {
  //       loginWithRedirect();
  //     }
  //   }, 2000);

  //   return () => clearTimeout(delay);
  // }, [isAuthenticated, loginWithRedirect]);

  
  return (
    <Router>
      <div className="flex">
        <NewSidebar>
          <SidebarItem icon={<MdDashboard />} text="Dashboard" to={'/'} active/>
          <SidebarItem icon={<FaShoppingCart/>} text="Orders" to={'/orders'} />
          <SidebarItem icon={<FaPerson/>} text="Customers" to={'/customers'} />
          <SidebarItem icon={<IoMdAnalytics/>} text="Analytics" to={'/analytics'}/>
        </NewSidebar>
        <div className="ml-30"> 
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={<route.element />}
                  key={index}
                />
              );
            })}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
