import SidebarContext from "@/SidebarContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import axios from "axios"
import '../styles/CustomerDetails.css'

interface UserData {
    phone: string;
    picture: string;
    username: string;
    location: [{
        locName: string;
        address: string;
        latitude: number;
        longitude: number;
    }]
}

export default function CustomerDetails() {
    const { expanded } = useContext(SidebarContext)
    const { id } = useParams()
    const [expandedClass, setExpandedClass] = useState("")
    const [userDetails, setUserDetails] = useState<UserData>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const userData = await axios.get(`http://localhost:4001/api/v1/customers/${id}`)
                setUserDetails(userData.data[0])
                console.log(userData.data[0])
                setIsLoading(false)
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[])

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
            {!isLoading ? 
            <div className="details-card">
                <div className="customer-picture">
                    <div>
                        <img src={userDetails?.picture}/>
                    </div>
                    <h3>{userDetails?.username}</h3>
                </div>
                <div className="personal-info">
                    <h3>Personal Information</h3>
                    <p>First Name:</p>
                    <p>Last Name:</p>
                    <p>Email: &nbsp; {userDetails?.username}</p>
                    <p>Phone Number: &nbsp; {userDetails?.phone}</p>
                    <Button>Send Email</Button>
                </div>
            </div>
            :<p>Loading...</p>
            }
        </div>
    )
}