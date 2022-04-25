import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "./chartConfigs";

const HistoryChart = ({ data, name }) => {
    const chartRef = useRef();
    const { day, week, year } = data;
    const [timeFormat, setTimeFormat] = useState("24h");

    const determineTimeFormat = () => {
        switch (timeFormat) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            default:
                return day;
        }
    };

    useEffect(() => {
        if (chartRef && chartRef.current) {
            console.log("yeah");
            const chartInstance = new Chartjs(chartRef.current, {
                type: "line",
                data: {
                    datasets: [
                        {
                            label: `${name} price`,
                            data: determineTimeFormat(),
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
        }
    });

    return (
        <div className="bg-white border mt-2 rounded p-3">
            {/* <div>{renderPrice()}</div> */}
            <div>
                <canvas
                    ref={chartRef}
                    id="myChart"
                    width={600}
                    height={400}></canvas>
            </div>

            <div className="chart-button mt-1">
                <button
                    onClick={() => setTimeFormat("24h")}
                    className="btn btn-outline-secondary btn-sm">
                    24h
                </button>
                <button
                    onClick={() => setTimeFormat("7d")}
                    className="btn btn-outline-secondary btn-sm mx-1">
                    7d
                </button>
                <button
                    onClick={() => setTimeFormat("1y")}
                    className="btn btn-outline-secondary btn-sm">
                    1y
                </button>
            </div>
        </div>
    );
};

export default HistoryChart;
