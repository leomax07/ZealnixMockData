import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function DoughnutChartDemo() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#2563EB",
            "#38BDF8",
            // documentStyle.getPropertyValue("#2563EB"),
            // documentStyle.getPropertyValue("#38BDF8"),
          ],
          hoverBackgroundColor: [
            "#2563EB",
            "#38BDF8",
            // documentStyle.getPropertyValue("#2563EB"),
            // documentStyle.getPropertyValue("#38BDF8"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
      plugins: {
        legend: false,
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
}
