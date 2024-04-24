import { Generator, TestGenerator, TestStatusFloat } from "~/utils/types";
import GeneratorControlStatus from "./GeneratorControlStatus";
import PowerSupplyStatus from "./PowerSupplyStatus";
import StatusDayLog from "./StatusDayLog";
import StatusDiagram from "./StatusDiagram";
import TestSwitch from "./TestSwitch";
import RemoteOperation from "./RemoteOperation";
import { getMappedStatus, getMappedStatusDigitalOutputs } from "~/utils/functions";
import LineChartExample from "./LineChart";
import { useEffect, useState } from "react";
import { useDieselGenStartFloat } from "~/utils/useStore";

const Generator1 = (generatorProps: TestGenerator) => {
    const [testDataFloat, setTestDataFloat] = useState<Array<TestStatusFloat> | null>(null);
    const {genStartFloat, setGenStartFloat}= useDieselGenStartFloat()
    // let sensorParameters = generatorProps.generatorData;
    // let commercialPower = "OFF";
    // let remoteOperation = "ON";

    // sensorParameters.forEach((parameter) => {
    //     switch (parameter.name) {
    //         case "AC_POWER_FAILURE":
    //             switch (parameter.value) {
    //                 case true:
    //                     return (commercialPower = "OFF");
    //                 case false:
    //                     return (commercialPower = "ON");
    //             }
    //         case "AC_POWER_FAILURE_P":
    //             if (parameter.value === true) {
    //                 console.log("AC_POWER_FAILURE_P - Value is true");
    //             } else {
    //                 console.log("AC_POWER_FAILURE_P - Value is false");
    //             }
    //             break;
    //         case "RECTIFIER_ABNORMAL_ALARM":
    //             if (parameter.value === true) {
    //                 console.log("Rectifier Abnormal Alarm - Value is true");
    //             } else {
    //                 console.log("Rectifier Abnormal Alarm - Value is false");
    //             }
    //             break;
    //         case "UNDER_REMOTE_OPERATION":
    //             if (parameter.value === true) {
    //                 console.log("Under Remote Operation - Value is true");
    //             } else {
    //                 console.log("Under Remote Operation - Value is false");
    //             }
    //             break;
    //         default:
    //             console.log("Default case");
    //     }
    // });
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("/api/fetchVarsFloats",
    //                 {
    //                     next: {
    //                         revalidate: 10
    //                     }
    //                 });
    //             const jsonData = (await response.json()) as TestStatusFloat[];

    //             setTestDataFloat(jsonData);
                    
    //             // console.log(testData);
    //             // console.log("aaa")
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     void fetchData()
    // }, [])

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
    ] = getMappedStatus(generatorProps);
    
    const [
        remoteOperationStatus
    ] = getMappedStatusDigitalOutputs(generatorProps)

    const globalDegStatus = degStatus;
    const globalLoadStatus = loadOn;

    return (
        <div className=" m-3 flex h-full w-1/3 flex-col overflow-clip rounded-2xl border-2 border-[#575757] bg-[#3E3E3E] pb-5 text-sm font-bold tracking-widest">
            <div className=" sticky top-0 z-40 mb-7 flex h-20 w-full items-center justify-center bg-[#575757] text-center text-2xl font-normal uppercase tracking-widest">
                {generatorProps.generatorName}
            </div>
            {/* Test */}
            {/* <div className="text-md m-5 flex flex-col space-y-5 rounded-xl bg-base-100 p-5">
                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                    Test Connection
                </h1>
                <TestSwitch
                    id={generatorProps.generatorName}
                    //============= DITO MO LAGAY SA BABA YUNG NEED I-FETCH =================
                    statusSet={[
                        {
                            key: "statusSet1",
                            name: "EMERGENCY",
                            value: true,
                        },
                        {
                            key: "statusSet2",
                            name: "FREEZER_DOOR",
                            value: false,
                        },
                        {
                            key: "statusSet3",
                            name: "PHOTO_SENSOR",
                            value: false,
                        },
                        {
                            key: "statusSet4",
                            name: "POS",
                            value: true,
                        },
                    ]}
                />
            </div> */}

            {/* Generator Control Status */}
            <div className="text-md m-5 flex flex-col space-y-5 rounded-xl bg-base-100 p-5">
                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                    Generator Control Status
                </h1>
                <GeneratorControlStatus
                    id={generatorProps.generatorName}
                    runningHours={generatorProps.runningHours}
                    statusSet={[
                        {
                            name: "COMMERCIAL POWER",
                            value: commercialPower,
                        },
                        {
                            name: "DEG MODE",
                            value: degMode,
                        },
                        {
                            name: "DEG STATUS",
                            value: `${globalDegStatus}`,
                        },
                        {
                            name: "REMOTE OPERATION",
                            value: remoteOperation,
                        },
                        {
                            name: "LOAD ON",
                            value: `${globalLoadStatus}`,
                        },
                        {
                            name: "FUEL LEVEL",
                            value: fuelLevel,
                        },
                    ]}
                />
            </div>

            {/* Generator Power Diagram */}
            <div className="text-md m-5 flex flex-col space-y-6 rounded-xl bg-base-100 p-5">
                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                    Generator Power Diagram
                </h1>
                <StatusDiagram
                    loadStatus={globalLoadStatus}
                    degStatus={globalDegStatus}
                />
            </div>

            {/* Remote Operation */}
            <div className="text-md m-5 flex flex-col rounded-xl bg-base-100 p-5">
                <h1 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
                    Remote Operation
                </h1>
                <RemoteOperation
                    remoteOperationStatus={remoteOperationStatus ?? true}
                    disabled={false} />
            </div>

            {/* Power Supply Status */}
            <div className="text-md m-5 flex flex-col space-y-5 rounded-xl bg-base-100 p-5">
                <h1 className="text-sm font-semibold tracking-[0.2em]">
                    DC 48V POWER SUPPLY STATUS
                </h1>
                <PowerSupplyStatus
                    id="CDORFFWC"
                    statusSet={[
                        {
                            name: "DC POWER SUPPLY STATUS",
                            value: powerSupply,
                        },
                        {
                            name: "COMMERCIAL POWER",
                            value: commercialPowerDC,
                        },
                        {
                            name: "BATTERY TEMPERATURE",
                            value: batteryTemp,
                        },
                    ]}
                />
            </div>

            <div className="text-md m-5 flex flex-col space-y-5 rounded-xl bg-base-100 p-3 h-fit tracking-normal">
                <h1 className="text-sm font-semibold tracking-[0.2em]">
                    GRAPHICAL REPORT
                </h1>
                <LineChartExample
                    generatorName={generatorProps.generatorName}
                    runningHours={generatorProps.runningHours}
                    generatorData={generatorProps.generatorData}
                />
            </div>


            {/* Status Logs */}
            <div className="text-md m-5 flex flex-col space-y-6 rounded-xl bg-base-100 p-5">
                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                    Status Logs
                </h1>
                <StatusDayLog
                    id="start1"
                    day="MARCH 15, 2024"
                    statusLogSet={[
                        {
                            id: "stat1",
                            time: "08:36",
                            statusType: "success",
                            content: "Diesel Generator remote operation is ",
                            statusName: "STARTED",
                        },
                        {
                            id: "stat2",
                            time: "04:23",
                            statusType: "warning",
                            content: "Diesel Generator is on ",
                            statusName: "MANUAL",
                        },
                    ]}
                />
                <StatusDayLog
                    id="start2"
                    day="MARCH 05, 2024"
                    statusLogSet={[
                        {
                            id: "stat1",
                            time: "08:36",
                            statusType: "info",
                            content: "Diesel Generator remote operation is ",
                            statusName: "STARTED",
                        },
                    ]}
                />
                <StatusDayLog
                    id="start3"
                    day="FEB 17, 2024"
                    statusLogSet={[
                        {
                            id: "stat1",
                            time: "08:36",
                            statusType: "error",
                            content: "Diesel Generator remote operation is ",
                            statusName: "STARTED",
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Generator1;
