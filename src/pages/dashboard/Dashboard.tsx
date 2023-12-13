import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { DataCard } from "../../components/Dashboard/DataCard.tsx";
import { IoCartSharp } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import axios from "axios";
import "../../styles/Dashboard.css";

type StatusData = { _id: string; count: number };
type SalesData = {
  date: Date;
  revenue: number;
};

export const Dashboard = () => {
  const [revenue, setRevenue] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todaysOrders, setTodaysOrders] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [dailySales, setDailySales] = useState<SalesData[]>([]);
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

  const chartOptions = {
    options: {
      xaxis: {
        categories: dailySales.map((data) => data.date),
        type: "datetime",
      labels: {
        format: "dd MMM",
      },
      },

      colors: ["#0084ff", "#00b8d9", "#00c7b6", "#00e396", "#0acf97"],
      legend: {
        show: true,
      },
      chart: {
        type: "area",
        background: "white",
      },
    },

    series: [
      {
        name: "Revenue",
        data: dailySales.map((data) => data.revenue),
      },
    ],
  };

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

        const salesData = await axios.get(
          "http://localhost:4001/api/v1/dashboard/daily-sales/"
        );
        console.log(salesData.data);
        setDailySales(salesData.data);
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
            options={chartOptions}
            series={chartOptions.series}
            type="area"
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
