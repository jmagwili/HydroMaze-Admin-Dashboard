import React, { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(
          "http://localhost:4001/api/v1/orders/"
        );
        const ordersWithDateTime = userData.data.map((order: Orders) => {
          const dateTime = new Date(order.createdAt);
          const date = dateTime.toLocaleDateString();
          const time = dateTime.toLocaleTimeString();
          return { ...order, date, time };
        });
        setOrders(ordersWithDateTime);
      } catch (e) {
        console.log("Failed to fetch data\n", e);
      }
    };
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-100vw">
      <h1 className="ml-5 mt-5 font-semibold text-gray-800 text-3xl">ORDERS</h1>
      <hr className="mt-2 mb-20" />
      <div className="ml-20 ">
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

      {/* Pagination Controls */}
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
