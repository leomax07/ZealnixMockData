import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import "./LineGraphComponent.scss";

function LineGraphComponent() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary",
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["June", "July", "August", "September", "October"],
      datasets: [
        {
          label: "First Dataset",
          data: [150, 450, 300, 400, 270, 200, 250, 400, 150, 400, 480, 300],
          // data: [{x: 'June', y: 20}, {x: 'July', y: null}, {x: 'August', y: 10}],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
            autoSkip: true,
            maxTicksLimit: 5,
          },
          grid: {
            color: surfaceBorder,
          },
          suggestedMin: 100,
          suggestedMax: 500,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card">
      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
        className="line_chart"
      />
    </div>
  );
}

export default LineGraphComponent;
