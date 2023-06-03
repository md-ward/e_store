import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "./data";
import { Pie, Bar, Scatter } from "react-chartjs-2";

Chart.register(CategoryScale);
const SalesChart = () => {
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });




    return (
        <div>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020"
                        }
                        ,legend:{display:true,
                        align:"end",
                        position:"bottom",
                        }
                    }
                }}
            />
            {/* <h2 className="text-center pt-4 text-2xl text-dark-blue">Pie Chart</h2> */}

        </div>

    );
}

export default SalesChart;


// !bar chart .........

export const BarChart = ({ chartData }) => {
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
};

// ? Scatter chart to compare sales 

export const ScatterChart = ({ chartData }) => {
    return (
        <div >
            <h2 style={{ textAlign: "center" }}>Sales Comparison</h2>
            <Scatter
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Current Month vs Previous Month Sales',
                            font: {
                                size: 20,
                                family: 'Arial',
                                weight: 'bold'
                            },
                            padding: {
                                top: 20,
                                bottom: 10
                            }
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Previous Month Sales'
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        },
                        y: {
                            type: 'linear',
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Current Month Sales'
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                }}
            />
        </div>
    );
};