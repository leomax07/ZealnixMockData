import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import "./BarGraphComponent.scss";

interface BarGraphComponentprops {
  BarchartLabelsX: string[];
  BarchartLabelsY: number[];
}

function BarGraphComponent({
  BarchartLabelsX,
  BarchartLabelsY,
}: BarGraphComponentprops) {
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
      labels: BarchartLabelsX,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          data: BarchartLabelsY,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          maxBarThickness: 20,
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
            autoSkip: true,
            maxTicksLimit: 7,
            callback(dataSet: string) {
              return `${dataSet}k`;
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
          suggestedMin: 100,
          suggestedMax: 500,
          beginAtZero: false,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card">
      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        className="bar_chart"
      />
    </div>
  );
}

export default BarGraphComponent;
