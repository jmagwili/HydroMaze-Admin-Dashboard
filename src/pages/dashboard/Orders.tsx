import { useState, useEffect, useContext, CSSProperties } from "react";
import axios from "axios";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge";
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Orders {
  _id: string;
  username: string;
  round: number;
  slim: number;
  total: number;
  isOwned: boolean;
  status: string;
  createdAt: string;
  date: string;
  time: string;
}

// interface searchInfo {
//   name: string;
//   status: string;
// }

import SidebarContext from "@/SidebarContext";

const Orders = () => {
  const today = new Date()
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    to: addDays(new Date(today.getFullYear(), today.getMonth(), today.getDate()),0),
  })
  const [searchInfo, setSearchInfo] = useState({})
  const [orders, setOrders] = useState<Orders[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const {expanded} = useContext(SidebarContext)
  const [expandedStyle, setExpandedStyle] = useState<CSSProperties>({
    transition: "0.1s"
  })

  const handleSubmit = async () => {
    try{
      const orderData = await axios.post("http://localhost:4001/api/v1/orders/search", searchInfo)
      const ordersWithDateTime = orderData.data.map((order: Orders) => {
        const dateTime = new Date(order.createdAt);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return { ...order, date, time };
      });
      setOrders(ordersWithDateTime);
      setCurrentPage(1)
    }catch(error){
      console.log(error)
    }
  }


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userData = await axios.get(
  //         "http://localhost:4001/api/v1/orders/"
  //       );
  //       const ordersWithDateTime = userData.data.map((order: Orders) => {
  //         const dateTime = new Date(order.createdAt);
  //         const date = dateTime.toLocaleDateString();
  //         const time = dateTime.toLocaleTimeString();
  //         return { ...order, date, time };
  //       });
  //       setOrders(ordersWithDateTime);
  //     } catch (e) {
  //       console.log("Failed to fetch data\n", e);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(()=>{
    !expanded 
    ? setExpandedStyle({
      left: "70px",
      width: "calc(100vw - 85px)",
      transition: "0.1s"
    }) 
    : setExpandedStyle({
      transition: "0.1s"
    })
    
  },[expanded])

  useEffect(()=>{
    console.log(searchInfo)
  },[searchInfo])

  useEffect(()=>{
    setSearchInfo({...searchInfo, startDate: date?.from, endDate: date?.to})
  },[date])

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={`relative left-[285px]`} style={expandedStyle}>
      <h1 className="ml-5 mt-5 font-semibold text-gray-800 text-3xl">ORDERS</h1>
      <hr className="mt-2 mb-10" />
      <div className="ml-20 ">
      <Card className="w-[70%] ml-auto mr-auto mb-[60px]">
      <CardHeader>
        <CardTitle>Search Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                placeholder="Name of your customer" 
                onChange={(e)=>setSearchInfo({...searchInfo, name: e.target.value})}/>
            </div>
            <div className={cn("grid gap-2")}>
            <Label>Date Range</Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[100%] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Order Status</Label>
              <Select onValueChange={(value)=>setSearchInfo({...searchInfo, status: value})}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                <SelectItem value="null">Select</SelectItem>
                  <SelectItem value="confirmed">confirmed</SelectItem>
                  <SelectItem value="pending">pending</SelectItem>
                  <SelectItem value="rejected">rejected</SelectItem>
                  <SelectItem value="delivered">delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-start">
        <Button className="w-[20%]" onClick={handleSubmit}>Search</Button>
      </CardFooter>
    </Card>
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

      
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(orders.length / ordersPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 mx-1 border ${
                currentPage === index + 1 ? "bg-gray-300" : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Orders;
