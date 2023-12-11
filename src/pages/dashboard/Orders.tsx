import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
const Orders = () => {
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(
          "http://localhost:4001/api/v1/orders/"
        );
        const ordersWithDateTime = userData.data.map(orders => {
          const dateTime = new Date(orders.createdAt);
          const date = dateTime.toLocaleDateString();
          const time = dateTime.toLocaleTimeString();
          return { ...orders, date, time };
        });
        setOrders(ordersWithDateTime);
        console.log(ordersWithDateTime);
      } catch (e) {
        console.log("Failed to fetch data\n", e);
      }
    };
    fetchData();
  },[]);
 
  return (
    <div>
      <h1 className="ml-5 mt-5 font-semibold text-gray-800 text-3xl">ORDERS</h1>
      <hr className="m-2" />
      <div>
          <Table>
              <TableCaption>
                All of your orders
              </TableCaption>
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
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.username}</TableCell>
                    <TableCell>{order.round}</TableCell>
                    <TableCell>{order.slim}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>


      </div>

    </div>
  );
};

export default Orders;
