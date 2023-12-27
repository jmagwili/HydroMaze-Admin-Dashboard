import SidebarContext from "@/SidebarContext"
import { useContext } from "react"
import { useParams } from "react-router-dom"

export default function CustomerDetails() {
    const { expanded } = useContext(SidebarContext)
    const { id } = useParams()


    return(
        <div>This is the Customer Details Page. Welcome {id}</div>
    )
}