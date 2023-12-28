import SidebarContext from "@/SidebarContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReactMapGL, { Marker } from "react-map-gl";
import { Button } from "@/components/ui/button"
import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import axios from "axios"
import { FaLocationDot } from "react-icons/fa6";
import '../styles/CustomerDetails.css'
import "mapbox-gl/dist/mapbox-gl.css";

interface UserData {
    phone: string;
    picture: string;
    username: string;
    location: {
      locName: string;
      address: string;
      latitude: number;
      longitude: number;
    }[];
  }
  
  interface LocData {
    data: [
      {
        phone: string;
        picture: string;
        username: string;
        location: [
          {
            locName: string;
            address: string;
            latitude: number;
            longitude: number;
          }
        ];
      }
    ];
  }
  
  interface Viewport {
    longitude: number;
    latitude: number;
    zoom: number;
  }

export default function CustomerDetails() {
    const { expanded } = useContext(SidebarContext)
    const { id } = useParams()
    const [expandedClass, setExpandedClass] = useState("")
    const [userDetails, setUserDetails] = useState<UserData>()
    const [isLoading, setIsLoading] = useState(true)
    const [viewports, setViewports] = useState<Viewport[] | undefined>();

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const userData:LocData = await axios.get(`http://localhost:4001/api/v1/customers/${id}`)
                setUserDetails(userData.data[0])
                
                let structuredLocData:Viewport[] = []

                for(let i in userData.data[0].location){
                    structuredLocData.push({
                        longitude: userData.data[0].location[i].longitude,
                        latitude: userData.data[0].location[i].latitude,
                        zoom: 15,
                    })
                }
                setViewports(structuredLocData)

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

    useEffect(()=>{
        console.log(userDetails)
    },[userDetails])

    const currentOrders = [
        {
            _id: 1,
            username: "joshuamagwili@gmail.com",
            round: 1,
            slim: 1,
            total: 60,
            date: "12/28/2023",
            time: "8:30 AM",
            status: "delivered",
        }
    ]

    return(
        <div className={`customer-details ${expandedClass}`}>
            <h1 
            className="ml-5 mt-5 font-semibold text-gray-800 text-3xl"
            >
            CUSTOMERS
            </h1>
            <hr className="m-2" />
            {
                !isLoading ? 
                <>
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
                    <div className="location-card">
                    <h3>Location</h3>
                    
                    {userDetails?.location.map((location, index)=>{
                        return (
                            <div className="location-details-container" key={index}>
                                <div className="map-container">
                                <ReactMapGL
                                    longitude={viewports?.[index]?.longitude}
                                    latitude={viewports?.[index]?.latitude}
                                    zoom={13}
                                    mapboxAccessToken= {import.meta.env.VITE_MAPBOX_TOKEN} 
                                    //token = "pk.eyJ1Ijoiam1hZ3dpbGkiLCJhIjoiY2xwaGZwaHh0MDJtOTJqbzVkanpvYjRkNSJ9.fZFeViJyigw6k1ebFAbTYA"                                  
                                    mapStyle="mapbox://styles/mapbox/streets-v12"
                                    interactive={true}
                                    onDrag={(e) => {
                                        setViewports(
                                            viewports?.map((viewport,j) => {
                                                return( 
                                                    j == index 
                                                    ? {
                                                        longitude: e.viewState.longitude,
                                                        latitude: e.viewState.latitude,
                                                        zoom: viewport.zoom,    
                                                    }
                                                    : viewport
                                                )
                                            })
                                        )                                           
                                    }}
                                >
                                    <Marker
                                        latitude={location.latitude}
                                        longitude={location.longitude}
                                    >
                                        <div>
                                        <FaLocationDot
                                            style={{
                                            height: "40px",
                                            width: "auto",
                                            color: "red",
                                            }}
                                        />
                                        </div>
                                    </Marker>
                                </ReactMapGL>

                                </div>
                                <div className="location-details">
                                    <p>Location Name: &nbsp;{location.locName}</p>
                                    <p>Address: &nbsp;{location.address}</p>
                                </div>
                            </div>                 
                        )
                    })}
                    </div>
                    <div className="recent-orders-card">
                        <h3>Recent Orders</h3>
                        <Table className="text-lg">
                            <TableCaption>All of your orders</TableCaption>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Round Orders</TableHead>
                                <TableHead>Slim Orders</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Date Ordered</TableHead>
                                <TableHead>Time Ordered</TableHead>
                                <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentOrders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>{order.username}</TableCell>
                                    <TableCell>{order.round}</TableCell>
                                    <TableCell>{order.slim}</TableCell>
                                    <TableCell>{order.total}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.time}</TableCell>
                                    <TableCell>
                                    {order.status === "pending" && (
                                        <Badge variant="secondary">Pending</Badge>
                                    )}
                                    {order.status === "delivered" && <Badge>Delivered</Badge>}
                                    {order.status === "for delivery" && (
                                        <Badge>For Delivery</Badge>
                                    )}
                                    {order.status === "rejected" && (
                                        <Badge variant="destructive">Rejected</Badge>
                                    )}
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                    </div>
                </>
                :<p>Loading...</p>
            }       
        </div>
    )
}