import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { DataCard } from "../../components/Dashboard/DataCard.tsx";
import { IoCartSharp } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import axios from "axios";
import "../../styles/Dashboard.css";

type StatusData = { _id: string; count: number };

export const Dashboard = () => {
  const [revenue, setRevenue] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todaysOrders, setTodaysOrders] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const pieOptions = {
    labels: statusData.map((data) => data._id),
    series: statusData.map((data) => data.count),
    colors: ["#0084ff", "#00b8d9", "#00c7b6", "#00e396", "#0acf97"],
    legend: {
      show: true,
    },
    
    chart: {
      toolbar: {
        show: true,
      },
    },
  };

  const [lineOptions, setLineOptions] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todaysOrders = await axios.get(
          "http://localhost:4001/api/v1/dashboard/orders-today/"
        );
        console.log(todaysOrders.data[0].count);
        setTodaysOrders(todaysOrders.data[0].count);

        const todaysRevenue = await axios.get(
          "http://localhost:4001/api/v1/dashboard/revenue-today/"
        );
        console.log(todaysRevenue.data[0].revenue);
        setTodaysRevenue(todaysRevenue.data[0].revenue);

        const statusData = await axios.get(
          "http://localhost:4001/api/v1/dashboard/status-data/"
        );
        console.log(statusData.data);
        setStatusData(statusData.data);
        setIsLoading(false);
      } catch (err) {
        console.log("failed to fetch data\n", err);
      }
    };
    fetchData();
  }, []);

  return (
    !isLoading && (
      <div className="dashboard">
        <h1 className="ml-5 mt-5 font-semibold text-gray-800 text-3xl">
          DASHBOARD
        </h1>
        <hr className="m-2" />
        <div className="datacard-container">
          <DataCard
            title="TODAY'S ORDERS"
            content={todaysOrders}
            color="#2554da"
            icon={<IoCartSharp />}
          />
          <DataCard
            title="TODAY'S REVENUE"
            content={todaysRevenue}
            color="#a51ce6"
            icon={<BsGraphUpArrow />}
          />
          <DataCard
            title="SALES THIS MONTH"
            content={100}
            color="#008080"
            icon={<FaMoneyBillTrendUp />}
          />
        </div>

        <section className="charts-section">
          <Chart
            options={pieOptions}
            series={pieOptions.series}
            type="pie"
            width="450"
            height="450"
            className="dashboard-charts"
          />

          <Chart
            options={lineOptions.options}
            series={lineOptions.series}
            type="line"
            width="450"
            height="300"
            className="dashboard-charts"
          />
        </section>
        <section className="table-section">
          <h3>Recent Orders</h3>
        </section>
      </div>
    )
  );
};
