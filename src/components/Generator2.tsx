import { Generator } from "~/utils/types";
import GeneratorControlStatus from "./GeneratorControlStatus";
import PowerSupplyStatus from "./PowerSupplyStatus";
import RemoteOperation from "./RemoteOperation";
import StatusDayLog from "./StatusDayLog";
import StatusDiagram from "./StatusDiagram";
import TestSwitch from "./TestSwitch";

const Generator2 = (generatorProps: Generator) => {
    return (
        <div className=" m-3 flex h-full w-1/3 flex-col overflow-clip rounded-2xl border-2 border-[#575757] bg-[#3E3E3E] pb-5 text-sm font-bold tracking-widest">
            <div className="sticky top-0 z-50 mb-7 flex h-20 w-full items-center justify-center bg-[#575757] text-center text-2xl font-normal uppercase tracking-widest">
                {generatorProps.generatorName}
            </div>

            {/* Generator Control Status */}
            <div className="text-md m-5 flex flex-col space-y-5 rounded-xl bg-base-100 p-5">
                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                    Generator Control Status
                </h1>
                <GeneratorControlStatus
                    id={generatorProps.generatorName}
                    statusSet={[
                        {
                            key: "statusSet1",
                            name: "COMMERCIAL POWER",
                            value: "ON",
                        },
                        {
                            key: "statusSet2",
                            name: "DEG MODE",
                            value: "AUTO",
                        },
                        {
                            key: "statusSet3",
                            name: "DEG STATUS",
                            value: "GENERATING",
                        },
                        {
                            key: "statusSet4",
                            name: "REMOTE OPERATION",
                            value: "STANDBY",
                        },
                        {
                            key: "statusSet5",
                            name: "LOAD ON",
                            value: "COMMERCIAL POWER",
                        },
                        {
                            key: "statusSet6",
                            name: "FUEL LEVEL",
                            value: "HIGH",
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
                    loadStatus="COMMERCIAL POWER"
                    genStatus="STANDBY"
                />
            </div>

            {/* Remote Operation */}
            <div className="text-md m-5 flex flex-col space-y-6 rounded-xl bg-base-100 p-5">
                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                    Remote Operation
                </h1>
                <RemoteOperation disabled={false} />
            </div>

            {/* Power Supply Status */}
            <div className="text-md m-5 flex flex-col space-y-5 rounded-xl bg-base-100 p-5">
                <h1 className="text-sm font-semibold tracking-[0.2em]">
                    DC 48V POWER SUPPLY STATUS
                </h1>
                <PowerSupplyStatus
                    id={generatorProps.generatorName}
                    statusSet={[
                        {
                            key: "statusSet1",
                            name: "DC POWER SUPPLY STATUS",
                            value: "OPERATING",
                        },
                        {
                            key: "statusSet2",
                            name: "COMMERCIAL POWER",
                            value: "OFF",
                        },
                        {
                            key: "statusSet3",
                            name: "BATTERY TEMPERATURE",
                            value: "HIGH",
                        },
                    ]}
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

export default Generator2;
