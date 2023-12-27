import SidebarContext from "@/SidebarContext"
import { useContext } from "react"
import { useParams } from "react-router-dom"

export default function CustomerDetails() {
    const { expanded } = useContext(SidebarContext)
    const { id } = useParams()


    return(
        <div className="relative left-[285px]">
            <h1 
            className="ml-5 mt-5 font-semibold text-gray-800 text-3xl"
            >
            CUSTOMERS
            </h1>
            <hr className="m-2" />
            <div>This is the Customer Details Page of {id}</div>
        </div>
    )
}