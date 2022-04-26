import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "./chartConfigs";

const HistoryChart = ({ id }) => {
	const chartRef = useRef();
	// const [chartData, setChartData] = useState(null);
	const [timeFormat, setTimeFormat] = useState("1");

	const formatData = (data) => {
		return data.map((el) => {
			return {
				t: el[0],
				y: el[1].toFixed(2),
			};
		});
	};

	const fetchChartData = async (interval) => {
		try {
			let request =
				"https://api.coingecko.com/api/v3/coins/" +
				id +
				"/market_chart?vs_currency=usd&days=" +
				interval;

			let response = await fetch(request);
			const data = await response.json();
			return data.prices;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	useEffect(() => {
		if (chartRef && chartRef.current) {
			//console.log("yeah");
			fetchChartData(timeFormat)
				.then((data) => {
					//setChartData(formatData(data)))
					const chartInstance = new Chartjs(chartRef.current, {
						type: "line",
						data: {
							datasets: [
								{
									label: `${id} price`,
									data: formatData(data), //chartData, //determineTimeFormat(),
									backgroundColor: "#50fa7b",
									borderColor: "#ff79c6",
									pointRadius: 0,
								},
							],
						},
						options: {
							...historyOptions,
						},
					});
				})
				.catch((error) => console.log(error));
		}
	}, [timeFormat]);

	return (
		<div className="bg-white border mt-2 rounded p-3">
			{/* <div>{renderPrice()}</div> */}
			<div>
				<canvas
					ref={chartRef}
					id="myChart"
					width={600}
					height={400}
				></canvas>
			</div>

			<div className="chart-button mt-1">
				<button
					onClick={() => setTimeFormat("1")}
					className="btn btn-outline-secondary btn-sm"
				>
					24h
				</button>
				<button
					onClick={() => setTimeFormat("7")}
					className="btn btn-outline-secondary btn-sm mx-1"
				>
					7d
				</button>
				<button
					onClick={() => setTimeFormat("365")}
					className="btn btn-outline-secondary btn-sm"
				>
					1y
				</button>
			</div>
		</div>
	);
};

export default HistoryChart;
