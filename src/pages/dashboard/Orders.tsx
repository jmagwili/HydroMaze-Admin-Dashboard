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
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AlertButton } from "@/components/Orders/AlertButton";
import { Link } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import { BsXCircle } from "react-icons/bs";
import OrderDetails from "@/components/Orders/OrderDetails";
import StatusBadge from "@/components/Orders/StatusBadge";

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

import SidebarContext from "@/SidebarContext";
const formatDate = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();
  return { date, time };
};
const Orders = () => {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    to: addDays(
      new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      0
    ),
  });
  const [searchInfo, setSearchInfo] = useState({});
  const [orders, setOrders] = useState<Orders[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const { expanded, setActiveItem } = useContext(SidebarContext);
  const [expandedStyle, setExpandedStyle] = useState<CSSProperties>({
    transition: "0.1s",
  });
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const orderData = await axios.post(
        "http://localhost:4001/api/v1/orders/search",
        searchInfo
      );
      console.log(orderData);
      const ordersWithDateTime = orderData.data.map((order: Orders) => {
        const dateTime = new Date(order.createdAt);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return { ...order, date, time };
      });
      setOrders(ordersWithDateTime);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  };
 

  const handleCheckChange = (isSelected: string | boolean, orderID: string) => {
    isSelected
      ? setSelectedOrders([...selectedOrders, orderID])
      : setSelectedOrders(selectedOrders.filter((order) => order !== orderID));
  };
  useEffect(() => {
    const getInitialData = async () => {
      try {
        const ordersResponse = await axios.get('http://localhost:4001/api/v1/orders/');
        const ordersData = ordersResponse.data.map((order: Orders) => ({
          ...order,
          ...formatDate(order.createdAt),
        }));
  
        const pendingOrders = ordersData.filter((order: Orders) => order.status === 'pending');
        const confirmedOrders = ordersData.filter((order: Orders) => order.status === 'confirmed');
        const forDeliveryOrders = ordersData.filter((order: Orders) => order.status === 'for delivery');
        const deliveredOrders = ordersData.filter((order: Orders) => order.status === 'delivered');
        const rejectedOrders = ordersData.filter((order: Orders) => order.status === 'rejected');
  
        setOrders([...pendingOrders, ...confirmedOrders, ...forDeliveryOrders, ...deliveredOrders, ...rejectedOrders]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    getInitialData();
  }, []);
  

  const handleListConfirm = async () => {
    try {
      const confirmedOrders = await axios.post(
        "http://localhost:4001/api/v1/orders/confirm",
        selectedOrders
      );
      if (confirmedOrders.data.successful) {
        toast({
          title: "Orders Successfully Confirmed",
        });
        handleSubmit();
        setSelectedOrders([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleListReject = async () => {
    try {
      const confirmedOrders = await axios.post(
        "http://localhost:4001/api/v1/orders/reject",
        selectedOrders
      );
      if (confirmedOrders.data.successful) {
        toast({
          title: "Orders Successfully Rejected",
        });
        handleSubmit();
        setSelectedOrders([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSingleConfirm = async (id: String) => {
    try {
      const confirmedOrders = await axios.post(
        "http://localhost:4001/api/v1/orders/confirm",
        [id]
      );
      if (confirmedOrders.data.successful) {
        toast({
          title: "Orders Successfully Confirmed",
        });
        handleSubmit();
        setSelectedOrders([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSingleReject = async (id:String) => {
    try {
      const confirmedOrders = await axios.post(
        "http://localhost:4001/api/v1/orders/reject",
        [id]
      );
      if (confirmedOrders.data.successful) {
        toast({
          title: "Orders Successfully Rejected",
        });
        handleSubmit();
        setSelectedOrders([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setActiveItem("/orders");
    // const fetchData = async () => {
    //   try {
    //     const userData = await axios.get(
    //       "http://localhost:4001/api/v1/orders/"
    //     );
    //     const ordersWithDateTime = userData.data.map((order: Orders) => {
    //       const dateTime = new Date(order.createdAt);
    //       const date = dateTime.toLocaleDateString();
    //       const time = dateTime.toLocaleTimeString();
    //       return { ...order, date, time };
    //     });
    //     setOrders(ordersWithDateTime);
    //   } catch (e) {
    //     console.log("Failed to fetch data\n", e);
    //   }
    // };
    // fetchData();
  }, []);

  useEffect(() => {
    !expanded
      ? setExpandedStyle({
          left: "70px",
          width: "calc(100vw - 85px)",
          transition: "0.1s",
        })
      : setExpandedStyle({
          transition: "0.1s",
          width: "80vw",
        });
  }, [expanded]);

  useEffect(() => {
    console.log(searchInfo);
  }, [searchInfo]);

  useEffect(() => {
    setSearchInfo({
      ...searchInfo,
      startDate: date?.from?.toISOString(),
      endDate: date?.to?.toISOString(),
    });
  }, [date]);
  

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={`relative left-[285px]`} style={expandedStyle}>
      <h1 className="ml-5 mt-5 font-semibold text-gray-800 text-3xl">ORDERS</h1>
      <hr className="mt-2 mb-10" />
      <div className="ml-[2%] w-[93%]">
        <Card
          className={`w-[70%] ml-auto mr-auto mb-[70px]`}
        >
          <CardContent className="pt-5">
            <div className="grid grid-cols-4 gap-4">
              <div className=" col-span-1 flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your customer"
                  onChange={(e) =>
                    setSearchInfo({ ...searchInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="col-span-1 flex flex-col space-y-1.5">
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
              <div className="col-span-1 flex flex-col space-y-1.5">
                <Label htmlFor="framework">Order Status</Label>
                <Select
                  onValueChange={(value) =>
                    setSearchInfo({ ...searchInfo, status: value })
                  }
                >
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
              <div className="col-span-1 flex items-end">
                {/* <Button onClick={handleSubmit}>Search</Button> */}
                <button type="button" onClick={handleSubmit} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </div>
          </CardContent>
         
        </Card>

        {selectedOrders.length > 0 && (
          <div className="relative h-[50px]">
            <div className="absolute right-0">
              <AlertButton onContinue={handleListConfirm} className="mr-2">
                Accept
              </AlertButton>
              <AlertButton onContinue={handleListReject}>Reject</AlertButton>
            </div>
          </div>
        )}

        <Table className="text-base">
          <TableCaption>All of your orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead><Checkbox /></TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Round</TableHead>
              <TableHead>Slim</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order._id}>
                {order.status === "pending" ? (
                  <TableCell>
                    <Checkbox
                      onCheckedChange={(checked) =>
                        handleCheckChange(checked, order._id)
                      }
                    />
                  </TableCell>
                ) : (
                  <TableCell>
                    <Checkbox checked={false} disabled />
                  </TableCell>
                )}
                <TableCell>
                  <Link to={`/orders/${order._id}`} className="underline">
                    {order._id}
                  </Link>
                </TableCell>
                <TableCell>{order.round}</TableCell>
                <TableCell>{order.slim}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.time}</TableCell>
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
                <TableCell className="text-blue-800">
                  {/* <Button className="mr-1 px-2 h-8"><GiConfirmed /></Button>
                  <Button className="mr-1 px-2 h-8"><BsXCircle /></Button> */}
                  <AlertButton 
                    onContinue={()=>handleSingleConfirm(order._id)}
                    className="text-blue-800 bg-transparent h-[auto] p-0 font-normal text-base hover:bg-transparent"
                  >
                     Accept
                  </AlertButton><br />
                  <AlertButton 
                    onContinue={()=>handleSingleReject(order._id)}
                    className="text-blue-800 bg-transparent h-[auto] p-0 font-normal text-base hover:bg-transparent"
                  >
                     Reject
                  </AlertButton><br />                 
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
      <Toaster />
    </div>
  );
};

export default Orders;
