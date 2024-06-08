import { useContext, useEffect } from "react";
import SidebarContext from "@/SidebarContext";
import axios from "axios";
import { useState } from "react";
import InfoCard from "@/components/Analytics/InfoCard";
import Chart from "react-apexcharts";
import "../../styles/Analytics.css";
import { ApexOptions } from "apexcharts";
import Lottie from "lottie-react";
import AnimationData from "../../assets/animation.json";
import { FaPesoSign } from "react-icons/fa6";
interface conTypeSales {
  month: string;
  totalRoundOrders: number;
  totalSlimOrders: number;
  year: number;
}
interface monthlySales {
  month: string;
  total: number;
}
const Analytics = () => {
  const { setActiveItem } = useContext(SidebarContext);

  const [monthTotal, setMonthTotal] = useState<number>(0);
  const [weekTotal, setWeekTotal] = useState<number>(0);
  const [yearTotal, setYearTotal] = useState<number>(0);
  const [conTypeSales, setConTypeSales] = useState<conTypeSales[]>([]);
  const [monthlySalesData, setMonthlySalesData] = useState<monthlySales[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const conTypeOptions = {
    options: {
      xaxis: {
        categories: conTypeSales.map((item) => item.month),
        type: "datetime",
        labels: {
          format: "dd MMM",
        },
      },

      colors: ["#0084ff", "#00b8d9"],
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
        name: "Round",
        data: conTypeSales.map((item) => item.totalRoundOrders),
      },
      {
        name: "Slim",
        data: conTypeSales.map((item) => item.totalSlimOrders),
      },
    ],
  } as ApexOptions;
  const monthlySalesOptions = {
    options: {
      xaxis: {
        categories: monthlySalesData.map((item) => item.month),
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
        type: "bar",
        background: "white",
      },
    },
    series: [
      {
        name: "Sales",
        data: monthlySalesData.map((item) => item.total),
      },
    ],
  } as ApexOptions;

  console.log("monthly", monthlySalesData);
  useEffect(() => {
    setActiveItem("/analytics");
  }, []);

  useEffect(() => {
    const salesData = async () => {
      const totalSales = await axios.get(
        "http://localhost:4001/api/v1/analytics/total-sales"
      );
      const containerTypeSales = await axios.get(
        "http://localhost:4001/api/v1/analytics/container-type-rev"
      );
      const monthlySales = await axios.get(
        "http://localhost:4001/api/v1/analytics/monthly-rev"
      );

      if (totalSales.data.monthlySalesTotal) {
        setMonthTotal(totalSales.data.monthlySalesTotal[0].total);
      } else {
        setMonthTotal(0);
      }

      if (totalSales.data.weeklySalesTotal[0]) {
        console.log("w:", totalSales.data.weeklySalesTotal[0].total);
        setWeekTotal(totalSales.data.weeklySalesTotal[0].total);
      } else {
        setWeekTotal(0);
      }

      if (totalSales.data.yearlySalesTotal[0]) {
        setYearTotal(totalSales.data.yearlySalesTotal[0].total);
      } else {
        setYearTotal(0);
      }

      console.log("total", totalSales.data.weeklySalesTotal[0].total);
      setConTypeSales(containerTypeSales.data);
      console.log(containerTypeSales.data);
      setMonthlySalesData(monthlySales.data);

      console.log(totalSales);
    };
    salesData();
    setIsLoading(false);
  }, []);


  return (
    <>
      {!isLoading ? (
        <div className="relative left-[285px]">
          <h1 className="ml-5 mt-5 font-semibold text-gray-800 text-3xl">
            ANALYTICS
          </h1>
          <hr className="m-2" />

          <div className="container">
            <div className="card1">
              <InfoCard sales={monthTotal + yearTotal} label = {"Total Revenue"} icon = {FaPesoSign} />
            </div>
            <div className="card2">
              <InfoCard sales={yearTotal} label = {"Past Year"} icon = {FaPesoSign}/>
            </div>
            <div className="lineGraph">
              <h1 className="font-semibold ml-5 mt-5">Slim vs Round Sales per Month</h1>
              <Chart
                options={conTypeOptions}
                series={conTypeOptions.series}
                type="line"
                width="530px"
                height="350px"
                className="dashboard-charts"
                style={{
                  marginTop: "30px",
                }}
              />
            </div>
            <div className="card3">
              <InfoCard sales={monthTotal} label ={"Past Month"} icon = {FaPesoSign} />
            </div>
            <div className="card4">
              <InfoCard sales={weekTotal} label = {"Past Week"} icon = {FaPesoSign} />
            </div>
            <div className="barGraph">
              <h1 className="font-semibold ml-5 mt-5">Monthly Revenue</h1>
              <Chart
                options={monthlySalesOptions}
                series={monthlySalesOptions.series}
                type="bar"
                width="530px"
                height="350px"
                className="dashboard-charts"
                style={{
                  marginTop: "30px",
                }}
              />
            </div>
          </div>
        </div>
      ): (<div className="flex justify-center items-center">
      <Lottie
        animationData={AnimationData}
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />
      </div>)}
    </>
  );
}


export default Analytics;
