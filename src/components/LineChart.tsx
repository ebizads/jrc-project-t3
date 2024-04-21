import { useEffect, useRef, MouseEvent, useState } from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
    DatasetChartOptions,
} from 'chart.js';
// import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-moment'

// import { fetchData } from "~/utils/dataApi";

// Register necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
);

// Define interfaces for the data point and dataset
interface DataPoint {
    x: string;
    y: number;
}

interface DataSet {
    label: string;
    borderColor: string;
    backgroundColor: string;
    data: DataPoint[];
}

interface ChartData {
    datasets: DataSet[];
}


const LineChartExample = () => {

    const chartRef = useRef<ChartJS<"line">>(null);
    const [chartData, setChartData] = useState<ChartData>({
        datasets: [
            {
                label: 'Data 1',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                data: [],
            },
            {
                label: 'Data 2',
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                data: [],
            },
            {
                label: 'Data 3',
                borderColor: 'rgb(0, 255, 153)',
                backgroundColor: 'rgb(0, 255, 153, 0.5)',
                data: [],
            }
        ]
    });

    // Function to add new data points
    const addDataPointsData1 = () => {
        const newTime = new Date().toISOString();

        setChartData(prevChartData => ({
            datasets: prevChartData.datasets.map(dataset => {
                let value
                if (dataset.label === "Data 1") {
                    value = Math.round(Math.random())  // value betweeon 0 and 1
                }
                else if (dataset.label === "Data 2") {
                    value = Math.round(Math.random()) * 1 + 2  // value betweeon 2 and 3
                }
                else if (dataset.label === "Data 3") {
                    value = Math.round(Math.random()) * 1 + 4 // value betweeon 4 and 5
                }


                const newDataPoint: DataPoint = { x: newTime, y: value ?? 0 };
                const newData = [...dataset.data, newDataPoint];

                // Keep only the latest 20 data points
                if (newData.length > 20) {
                    newData.shift();
                }
                return { ...dataset, data: newData };
            })
        }));
    };

    useEffect(() => {
        const interval = setInterval(
            addDataPointsData1
            , 60000); // Update every 2000 milliseconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Chart options
    // const options = {
    //     scales: {
    //         // type:'time',
    //         x: {
    //             type: 'time' as const,
    //             time: {
    //                 tooltipFormat: 'll HH:mm:ss' // Formatting time for tooltip
    //             },
    //             title: {
    //                 display: true,
    //                 text: 'Time'
    //             }
    //         },
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    // } ?? [];

    const unit: 'minute' | 'hour' | 'day' | 'month' = 'minute' as 'minute';

    const options = {
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    tooltipFormat: 'll HH:mm:ss',
                    unit: unit as 'minute' | 'hour' | 'day' | 'month'
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                beginAtZero: false
            }
        }
    };


    return (
        <div className="">
            <Line
                // redraw={true}
                // ref={chartRef}
                data={chartData}
                options={options}
            />
        </div>
    );
}

export default LineChartExample;