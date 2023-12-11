import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(
          "http://localhost:4001/api/v1/orders/"
        );
        setOrders(userData.data);
        console.log(userData.data);
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


    </div>
  );
};

export default Orders;
