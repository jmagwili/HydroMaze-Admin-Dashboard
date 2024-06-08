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
import '../../styles/CustomerDetails.css'
import "mapbox-gl/dist/mapbox-gl.css";
import StatusBadge from "../Orders/StatusBadge";
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

  interface OrderData{
    _id: string;
    round: number;
    slim: number;
    total: number;
    isOwned: boolean;
    status: string;
    username: string;   
    createdAt: string;
    date: string;
    time: string;
  }

export default function CustomerDetails() {
    const { expanded } = useContext(SidebarContext)
    const { id } = useParams()
    const [expandedClass, setExpandedClass] = useState("")
    const [recentOrders, setRecentOrders] = useState<OrderData[]>([])
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

                const orders = await axios.get(`http://localhost:4001/api/v1/customers/recent-orders/${id}`)

                const ordersWithDateTime = orders.data.map((order:OrderData) => {
                    const dateTime = new Date(order.createdAt);
                    const date = dateTime.toLocaleDateString();
                    const time = dateTime.toLocaleTimeString();
                    return { ...order, date, time };
                });

                setRecentOrders(ordersWithDateTime)
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

    const sendEmail = () => {
        if (id) {
          const mailtoUrl = `mailto:${encodeURIComponent(id)}?subject=Subject&body=Body`;
          window.open(mailtoUrl, '_blank');
        } else {
          console.error('Email address is undefined');
        }
      };
      

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
                            <Button onClick={sendEmail}>Send Email</Button>
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
                                    zoom={viewports?.[index]?.zoom}
                                    mapboxAccessToken= {import.meta.env.VITE_MAPBOX_TOKEN} 
                                    //token = "pk.eyJ1Ijoiam1hZ3dpbGkiLCJhIjoiY2xwaGZwaHh0MDJtOTJqbzVkanpvYjRkNSJ9.fZFeViJyigw6k1ebFAbTYA"                                  
                                    mapStyle="mapbox://styles/mapbox/streets-v12"
                                    interactive={true}
                                    onZoom={(e)=>{
                                        setViewports(
                                            viewports?.map((viewport,j) => {
                                                return( 
                                                    j == index 
                                                    ? {
                                                        longitude: viewport.longitude,
                                                        latitude: viewport.latitude,
                                                        zoom: e.viewState.zoom,    
                                                    }
                                                    : viewport
                                                )
                                            })
                                        )      
                                    }}
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
                                <TableHead>Date Ordered</TableHead>
                                <TableHead>Time Ordered</TableHead>
                                <TableHead>Round Orders</TableHead>
                                <TableHead>Slim Orders</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.time}</TableCell>
                                        <TableCell>{order.round}</TableCell>
                                        <TableCell>{order.slim}</TableCell>
                                        <TableCell>{order.total}</TableCell>
                                        <TableCell>
                                        {order.status === "pending" && (
                    <StatusBadge status="pending"/>
                  )}
                  {order.status === "confirmed" && (
                    <StatusBadge status="confirmed"/>
                  )}
                  {order.status === "delivered" && <StatusBadge status="delivered"/>}
                  {order.status === "for delivery" && (
                    <StatusBadge status="for delivery"/>
                  )}
                  {order.status === "rejected" && (
                    <StatusBadge status="rejected"/>
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