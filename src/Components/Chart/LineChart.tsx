import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

interface Props {
	className?: string;
	data: any;
	options: {};
}

export default function LineChart({ className, data, options }: Props) {
	const [chartData, setChartData] = useState({});
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		setChartData(data);
		setChartOptions(options);
	}, [data, options]);

	return (
		<div className="line__chart__container">
			<Chart
				className={className}
				type="line"
				data={chartData}
				options={chartOptions}
			/>
		</div>
	);
}
