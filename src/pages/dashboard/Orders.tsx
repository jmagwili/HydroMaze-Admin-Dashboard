import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
interface Orders {
  _id: string;
  round: number;
  slim: number;
  total: number;
  isOwned: boolean;
  status: string;
  createdAt: Date;
}

const Orders = () => {
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(
          "http://localhost:4001/api/v1/orders/"
        );
        setOrders(userData.data);
      } catch (e) {
        console.log("Failed to fetch data\n", e);
      }
    };
    fetchData();
  });

  return (
    <div>
      <h1 className="ml-5 mt-5 font-semibold text-gray-800 text-3xl">ORDERS</h1>
      <hr className="m-2" />
    </div>
  );
};

export default Orders;
