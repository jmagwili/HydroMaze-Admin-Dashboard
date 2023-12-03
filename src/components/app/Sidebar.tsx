import { Button } from "../ui/button"
import '../../styles/sidebar.css'
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

export const Sidebar = () => {
    return(
        <div className="sidebar">
            <div><h2>Hydro<span>Maze</span></h2></div>
            <Button><MdDashboard className="sidebar-icons"/>Dashboard</Button>
            <Button><FaShoppingCart className="sidebar-icons"/>Orders</Button>
            <Button><FaPerson className="sidebar-icons"/>Customers</Button>
            <Button><IoMdAnalytics className="sidebar-icons"/>Analytics</Button>
            <Button className="sidebar-logout"><IoLogOut className="sidebar-icons"/>Log Out</Button>
        </div>
    )
}