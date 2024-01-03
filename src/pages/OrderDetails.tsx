import SidebarContext from "@/SidebarContext"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function OrderDetails(){
    const { setActiveItem } = useContext(SidebarContext)
    const { orderID } = useParams()

    useEffect(()=>{
        setActiveItem("/orders")
    })

    return(
        <div className={`relative left-[285px]`}>
            <h1 className="ml-5 mt-5 font-semibold text-gray-800 text-3xl">ORDERS</h1>
            <hr className="mt-2 mb-10" />

            <p>This is the order details page of order with id {orderID}</p>

            <div>
                
            </div>
        </div>
    )
}