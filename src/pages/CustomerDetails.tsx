import SidebarContext from "@/SidebarContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import '../styles/CustomerDetails.css'

export default function CustomerDetails() {
    const { expanded } = useContext(SidebarContext)
    const { id } = useParams()
    const [expandedClass, setExpandedClass] = useState("")

    useEffect(()=>{
        setExpandedClass(!expanded ? "notExpanded" : "")
    },[expanded])

    return(
        <div className={`customer-details ${expandedClass}`}>
            <h1 
            className="ml-5 mt-5 font-semibold text-gray-800 text-3xl"
            >
            CUSTOMERS
            </h1>
            <hr className="m-2" />

            <div className="details-card">
                <div className="customer-picture">
                    <img src=""/>
                </div>
                <div className="personal-info">
                    <h3>Personal Information</h3>
                    <p>First Name: {id}</p>
                    <p>Last Name: {id}</p>
                    <p>Email: </p>
                    <p>Phone Number: </p>
                    <Button>Send Email</Button>
                </div>
            </div>
        </div>
    )
}