import { useContext, useEffect } from "react";
import SidebarContext from "@/SidebarContext";
import axios from "axios";
import { useState } from "react";
import InfoCard from "@/components/Analytics/InfoCard";
import Chart from "react-apexcharts";
import "../../styles/Analytics.css"
import { ApexOptions } from "apexcharts";
interface conTypeSales {
  month: string;
  totalRoundOrders: number;
  totalSlimOrders: number;
  year : number;


}
interface monthlySales {
  month: string;
  total : number;


}
const Analytics = () => {
  const { setActiveItem } = useContext(SidebarContext);

  const [monthTotal, setMonthTotal] = useState<number>(0);
  const [weekTotal, setWeekTotal] = useState<number>(0);
  const [yearTotal, setYearTotal] = useState<number>(0);
  const [conTypeSales, setConTypeSales] = useState<conTypeSales[]>([]);
  const [monthlySalesData, setMonthlySalesData] = useState<monthlySales[]>([]);
  
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
      colors: ["#0084ff"],
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
  
  
  console.log("monthly",monthlySalesData);
  useEffect(() => {
    setActiveItem("/analytics");
  }, []);

  useEffect(() => {
    const salesData = async() => {
      const totalSales = await axios.get("http://localhost:4001/api/v1/analytics/total-sales");
      const containerTypeSales = await axios.get("http://localhost:4001/api/v1/analytics/container-type-rev");
      const monthlySales = await axios.get("http://localhost:4001/api/v1/analytics/monthly-rev");

      if (totalSales.data.monthlySalesTotal[0]) {
        setMonthTotal(totalSales.data.monthlySalesTotal[0].total);
      } else {
        setMonthTotal(0);
      }

      if (totalSales.data.weeklySalesTotal[0]) {
        console.log("w:",totalSales.data.weeklySalesTotal[0].total);
        setWeekTotal(totalSales.data.weeklySalesTotal[0].total);
      } else {
        setWeekTotal(0);
      }

      if (totalSales.data.yearlySalesTotal[0]) {
        setYearTotal(totalSales.data.yearlySalesTotal[0].total);
      } else {
        setYearTotal(0);
      }

      console.log("total",totalSales.data.weeklySalesTotal[0].total)
      setConTypeSales(containerTypeSales.data);
      console.log(containerTypeSales.data);
      setMonthlySalesData(monthlySales.data);  
      
    }
    salesData();
  },[])
  console.log("week", weekTotal);
  console.log("month", monthTotal);
  console.log("year", yearTotal);

  return (
    <div className="relative left-[285px]">
      <h1 className="ml-5 mt-5 font-semibold text-gray-800 text-3xl">
        ANALYTICS
      </h1>
      <hr className="m-2" />

      <div className="container">
        <div className="card1"><InfoCard sales = {20} /></div>
        <div className="card2"><InfoCard  sales = {weekTotal} /></div>
        <div className="lineGraph">
          <h1>Sales per Container Type</h1>
          <Chart
            options={conTypeOptions}
            series={conTypeOptions.series}
            type="line"
            width="540px"
            height="350px"
            className="dashboard-charts"
            style={{
              marginTop:"30px"
            }}
          />
        </div>
        <div className="card3"><InfoCard  sales = {monthTotal}/></div>
        <div className="card4"><InfoCard  sales = {yearTotal}/></div>
        <div className="barGraph">
          <Chart
                options={monthlySalesOptions}
                series={monthlySalesOptions.series}
                type="bar"
                width="540px"
                height="350px"
                className="dashboard-charts"
                style={{
                  marginTop:"30px",
                  
                }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
