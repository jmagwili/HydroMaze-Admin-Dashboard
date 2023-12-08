import { useState } from "react";
import Chart from "react-apexcharts";

export const Test = () => {
    const [options, setOptions] = useState({
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      })

      const [series, setSeries] = useState([
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ])

    return(
        <div>
            <h1>Testing</h1>
            <Chart
              options={options}
              series={series}
              type="bar"
              width="500"
              style={{
                position: "absolute",
                right: "30vw"
              }}
            />
        </div>
    )
}