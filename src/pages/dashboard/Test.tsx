import { useState } from "react";
import Chart from "react-apexcharts";
import { DataCard } from "./components/DataCard.tsx";
import './styles/Dashboard.css';

export const Test = () => {
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
  return (
    <div className="dashboard">
      <div className="datacard-container">
        <DataCard title="TODAY'S ORDERS" content={100} color="#2554da" />
        <DataCard title="TODAY'S REVENUE" content={100} color="#a51ce6" />
        <DataCard title="SALES THIS MONTH" content={100} color="#008080" />
      </div>

      <section className="charts-container">
        <Chart
          options={pieOptions}
          series={pieOptions.series}
          type="pie"
          width="90%"
          style={{
     
            backgroundColor: "#FFFFFF",
            width:"450px",
            flex:"1"
          }}
        />

        <Chart
          options={lineOptions}
          series={lineOptions.series}
          type="line"
          width="90%"
          style={{
            backgroundColor: "#FFFFFF",
            width:"450px",
            flex:"1",
            display:"flex",
            justifyContent:"center",
            alignItems: "center"
          }}
        />
      </section>
      
    </div>
  );
};
