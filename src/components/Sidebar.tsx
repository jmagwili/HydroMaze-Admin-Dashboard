import { Button } from "./ui/button"
import '../styles/sidebar.css'
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"


export const Sidebar = () => {
    const [isOpen, setIsOpened] = useState(true);

    const handleOpen = ()=> {
        setIsOpened(!isOpen);
    }
    return(
        <>
        
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <Button onClick={handleOpen}>{isOpen ? 'Collapse' : 'Expand'}</Button>
            <div><h2>Hydro<span>Maze</span></h2></div>
            <Button variant="secondary" className="text-40"><MdDashboard className="sidebar-icons"/><Link to={'/'}>Dashboard</Link></Button>
            <Button variant="secondary"><FaShoppingCart className="sidebar-icons"/><Link to={'/orders'}>Orders</Link></Button>
            <Button variant="secondary"><FaPerson className="sidebar-icons"/><Link to={'/customers'}>Customers</Link></Button>
            <Button variant="secondary"><IoMdAnalytics className="sidebar-icons"/><Link to={'/analytics'}>Analytics</Link></Button>
            <Button variant="secondary" className="sidebar-logout"><IoLogOut className="sidebar-icons"/>Log Out</Button>
        </div>
        </>
    )
}