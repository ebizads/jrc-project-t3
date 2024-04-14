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
    ChartData
} from 'chart.js';
import 'chartjs-adapter-moment'

import { fetchData } from "~/utils/dataApi";

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


function LineChartExample() {

    const chartRef = useRef<ChartJS<"line">>(null);

    const [chartData, setChartData] = useState<ChartData<"line">>({
        labels: [], //Initial labels
        datasets: [
            {
                label: 'Sample Dataset',
                data: [],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.4
            },
        ],
    });

    // Chart options
    const options = {
        scales: {
            // type:'time',
            x: {
                type: 'time' as const,
                time: {
                    tooltipFormat: 'll HH:mm:ss' // Formatting time for tooltip
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    } ?? [];

    // Function to add new data points
    const addDataPoint = () => {
        const newTime = new Date(); // Use current time as the new label
        const newDataPoint = Math.floor(Math.random() * 100);
        setChartData(prevChartData => {
            // Copy the existing data
            const newLabels = [...prevChartData.labels ?? [], new Date().toISOString()];
            const newData = prevChartData.datasets.map(dataset => ({
                ...dataset,
                data: [...dataset.data, newDataPoint]
            }));

            const dataLength = newData[0]?.data.length ?? 0
            // Optionally, remove the oldest data point if the dataset becomes too large
            if ( dataLength > 5) { // Let's say we keep at most 20 data points
                // Remove the first label
                newLabels.shift();
                newData[0]?.data.shift(); // Remove the first data point from each dataset
            }

            console.log(newLabels, newData[0]?.data)
            return { ...prevChartData, labels: newLabels, datasets: newData };
        });
    };

    // Set up an interval for updating the chart
    useEffect(() => {
        const interval = setInterval(addDataPoint, 2000); // Update every 2000 milliseconds (2 seconds)

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="">
            <Line
                // redraw={true}
                ref={chartRef}
                data={chartData}
                options={options}
            />
        </div>
    );
}

export default LineChartExample;