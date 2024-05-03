import {
    useEffect,
    useRef,
    MouseEvent,
    useState,
    Context,
    useContext,
} from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
    Filler,
    DatasetChartOptions,
} from "chart.js";
// import 'chartjs-adapter-date-fns';
import "chartjs-adapter-moment";
import { getTestMappedStatus } from "~/utils/functions";
import { type TestGenerator, TestStatus } from "~/utils/types";

// import { fetchData } from "~/utils/dataApi";

// Register necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
    Filler
);

// Define interfaces for the data point and dataset
interface DataPoint {
    x: string;
    y: string;
}

interface DataSet {
    label: string;
    borderColor: string;
    backgroundColor?: string | CanvasGradient;
    data: DataPoint[];
    fillColor?: string | CanvasGradient;
    fill?: boolean | string;
    stepped?: boolean;
    yAxisID?: string;
}

interface ChartData {
    datasets: DataSet[];
}

const LineChartExample = (generatorData: TestGenerator) => {
    const chartRef = useRef<ChartJS<"line", DataPoint[]>>(null);
    const [gradientCP, setGradientCP] = useState<CanvasGradient>();
    const [gradientDS, setGradientDS] = useState<CanvasGradient>();
    const [gradientFL, setGradientFL] = useState<CanvasGradient>();

    const [
        commercialPower,
        degMode,
        degStatus,
        remoteOperation,
        loadOn,
        fuelLevel,
        powerSupply,
        commercialPowerDC,
        batteryTemp,
    ] = getTestMappedStatus(generatorData);

    useEffect(() => {
        const ctx = chartRef.current?.canvas.getContext("2d");
        if (ctx) {
            setGradientCP(ctx.createLinearGradient(0, 0, 0, 400));
            gradientCP?.addColorStop(0, "rgba(48, 101, 54, 1)");
            gradientCP?.addColorStop(1, "rgba(48, 101, 54, 0)");

            setGradientDS(ctx.createLinearGradient(0, 0, 0, 400));
            gradientDS?.addColorStop(0, "rgba(142, 40, 45, 1)");
            gradientDS?.addColorStop(1, "rgba(142, 40, 45, 0)");

            setGradientFL(ctx.createLinearGradient(0, 0, 0, 400));
            gradientFL?.addColorStop(0, "rgba(36, 114, 168, 1)");
            gradientFL?.addColorStop(0.8, "rgba(36, 114, 168, 0)");
        }
    }, [generatorData]);

    const [chartData, setChartData] = useState<ChartData>({
        datasets: [
            {
                label: "FUEL LEVEL",
                borderColor: "#85CDFF",
                backgroundColor: gradientFL,
                data: [],
                fill: true,
                stepped: true,
                yAxisID: "FL",
            },
            {
                label: "DEG STATUS",
                borderColor: "#F08288",
                backgroundColor: gradientDS,
                data: [],
                fill: true,
                stepped: true,
                yAxisID: "DS",
            },
            {
                label: "COMMERCIAL POWER",
                borderColor: "#B4FFBC",
                backgroundColor: gradientCP,
                // fillColor: gradient,,
                fill: true,
                data: [],
                stepped: true,
                yAxisID: "CP",
            },
        ],
    });

    // Function to add new data points

    useEffect(() => {
        const addDataPointsData1 = () => {
            const newTime = new Date().toISOString();

            setChartData((prevChartData) => ({
                datasets: prevChartData.datasets.map((dataset) => {
                    let valueTemp;
                    let value;

                    switch (dataset.label) {
                        case "FUEL LEVEL":
                            // console.log(fuelLevel)
                            value = fuelLevel;
                            dataset.backgroundColor = gradientFL;
                            break;
                        case "DEG STATUS":
                            // valueTemp = Math.round(Math.random()) * 1 + 2  // value betweeon 2 and 3
                            // console.log(degStatus);
                            value = degStatus;
                            dataset.backgroundColor = gradientDS;
                            break;
                        case "COMMERCIAL POWER":
                            // valueTemp = Math.round(Math.random()) * 1 + 4 // value betweeon 4 and 5
                            // console.log(valueTemp)
                            value = commercialPower;
                            dataset.backgroundColor = gradientCP;
                            break;
                    }
                    // console.log(dataset)
                    const newDataPoint: DataPoint = { x: newTime, y: value ?? "" };
                    const newData = [...dataset.data, newDataPoint];

                    // Keep only the latest 20 data points
                    if (newData.length > 20) {
                        newData.shift();
                    }
                    return { ...dataset, data: newData };
                }),
            }));
        };

        const interval = setInterval(addDataPointsData1, 60000); // Update every 60000 milliseconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [commercialPower, degStatus, fuelLevel]);

    const unit: "minute" | "hour" | "day" | "month" = "minute";
    const type = "category";
    const position: "left" | "center" | "right" | "top" | "bottom" =
        "left";

    const options = {
        layout: {
            padding: 0,
        },
        responsive: true,
        maintainAspectRatio: false,
        grid: {
            color: "#5A5A5A",
        },
        border: {
            color: "#5A5A5A",
        },
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 12,
                    },
                    padding: 12,
                    color: "#CCCCCC",
                },
            },
        },
        scales: {
            x: {
                type: "time" as const,
                time: {
                    displayFormat: "HH:mm",
                    unit: unit as "minute" | "hour" | "day" | "month",
                    // displayFormats: {
                    //     minute: 'HH:mm'
                    // }
                },
                title: {
                    display: true,
                    text: "Time (HH::mm)",
                    color: "#CCCCCC",
                },
                ticks: {
                    font: {
                        size: 9.5,
                    },
                    color: "#CCCCCC",
                },
                grid: {
                    color: "#5A5A5A",
                },
                border: {
                    color: "#5A5A5A",
                },
            },
            // FUEL LEVEL STYLES
            FL: {
                type: type as "category",
                labels: ["HIGH", "LOW"],
                position: position as
                    | "left"
                    | "center"
                    | "right"
                    | "top"
                    | "bottom",
                stack: "demo",
                stackWeight: 1,
                offset: true,
                grid: {
                    color: "#5A5A5A",
                },
                border: {
                    color: "#5A5A5A",
                },
                ticks: {
                    font: {
                        size: 8,
                    },
                    color: "#CCCCCC",
                },
            },
            // DEG STATUS STYLES
            DS: {
                type: type as "category",
                labels: ["GENERATING", "STANDBY", "FAILED"],
                position: position as
                    | "left"
                    | "center"
                    | "right"
                    | "top"
                    | "bottom",
                stack: "demo",
                stackWeight: 1,
                offset: true,
                grid: {
                    color: "#5A5A5A",
                },
                border: {
                    color: "#5A5A5A",
                },
                ticks: {
                    font: {
                        size: 8,
                    },
                    color: "#CCCCCC",
                },
            },
            // COMMERCIAL POWER STYLES
            CP: {
                type: type as "category",
                labels: ["ON", "OFF"],
                position: position as
                    | "left"
                    | "center"
                    | "right"
                    | "top"
                    | "bottom",
                stack: "demo",
                stackWeight: 1,
                offset: true,
                grid: {
                    color: "#5A5A5A",
                },
                border: {
                    color: "#5A5A5A",
                },
                ticks: {
                    font: {
                        size: 8,
                    },
                    color: "#CCCCCC",
                },
            },
        },
    };

    return (
        <div className="h-[60vh] w-full ">
            <Line
                // redraw={true}
                ref={chartRef}
                data={chartData}
                options={options}
            />
        </div>
    );
};

export default LineChartExample;
