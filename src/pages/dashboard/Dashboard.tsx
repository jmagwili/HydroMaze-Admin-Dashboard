import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { DataCard } from "../../components/Dashboard/DataCard.tsx";
import { IoCartSharp } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import axios from "axios";
import '../../styles/Dashboard.css';



export const Dashboard = () => {
  const [orderData, setOrderData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pieOptions, setPieOptions] = useState({
    series: [44, 55, 13, 33],
    labels: ['Delivered', 'Confirmed', 'Pending', 'Rejected'],
    plotOptions: {
      pie: {
        customScale: 0.9
      }
    },
  });

  const [lineOptions, setLineOptions] = useState({
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    }
  )

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const orderData = await axios.get('http://localhost:4001/api/v1/dashboard/orders-today/')
        setOrderData(orderData.data)
        
        let pendingCount = 0
        let confirmedCount = 0
        let rejectedCount = 0
        let deliveredCount = 0

        for(let i in orderData.data){
          switch(orderData.data[i].status){
            case "pending":
              pendingCount++
              break
            case "confirmed":
              confirmedCount++
              break
            case "rejected":
              rejectedCount++
              break
            case "delivered":
              deliveredCount++
              break
          }
        }
        setPieOptions({
          ...pieOptions,
          series: [
            deliveredCount,
            confirmedCount,
            pendingCount,
            rejectedCount
          ] 
        })
        setIsLoading(false)
      }catch(err){
        console.log("failed to fetch data\n",err)
      }
    }
    fetchData()
  },[])

  
  return (
    !isLoading &&
    <div className="dashboard">
      <div className="datacard-container">
        <DataCard 
          title="TODAY'S ORDERS" 
          content={orderData.length} 
          color="#2554da" 
          icon={<IoCartSharp />}
        />
        <DataCard 
          title="TODAY'S REVENUE" 
          content={100} 
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
          options={lineOptions}
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
  );
};
