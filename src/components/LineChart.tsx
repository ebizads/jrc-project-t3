import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";

import { dataApi } from "~/utils/dataApi";
// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

function LineChartExample() {

    // const { data: hander } = handler
    useEffect(() => {
        console.log(dataApi())
    }, [])
    return (
        <div className="bg-white">
            <Line
                data={{
                    labels: [
                        "2023-01",
                        "2023-02",
                        "2023-03",
                        "2023-04",
                        "2023-05",
                        "2023-06",
                        "2023-07",
                    ],
                    datasets: [
                        {
                            data: [100, 120, 115, 134, 168, 132, 200],
                            backgroundColor: "purple",
                        },
                    ],
                }}
            />
        </div>
    );
}

export default LineChartExample;