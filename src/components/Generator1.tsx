import type { StatusLogType, TestGenerator } from "~/utils/types";
import GeneratorControlStatus from "./GeneratorControlStatus";
import PowerSupplyStatus from "./PowerSupplyStatus";
import StatusDayLog from "./StatusDayLog";
import StatusDiagram from "./StatusDiagram";
import RemoteOperation from "./RemoteOperation";
import {
    getTestMappedStatus,
    getMappedStatusDigitalOutputs,
    getStatusDEG,
    getStatusTypeDEG,
    getStatusTypeRemoteOperationToFuelLevel,
} from "~/utils/functions";
import LineChartExample from "./LineChart";
import { useEffect, useRef } from "react";
import { useDieselGenStart } from "~/utils/useStore";
import { api } from "~/utils/api";

const Generator1 = (generatorProps: TestGenerator) => {
    // const [testDataFloat, setTestDataFloat] = useState<Array<TestStatusFloat> | null>(null);
    const { genStart, setGenStart } = useDieselGenStart();

    // MUTATE FUNCTION FOR LOGS TAKEN FROM GENERATOR ROUTER
    const { mutate } = api.generator.createLog.useMutation({
        onSuccess() {
            refetchLogs();
        },
    });

    // DATA OF ALL LOGS AND REFETCH FUNCTION FOR LOGS
    const { data: statusLogs, refetch: refetchLogs } =
        api.generator.findAllLogs.useQuery({
            filter: {
                generatorId: generatorProps.generatorId,
            },
            limit: 10,
        });

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
    ] = getTestMappedStatus(generatorProps);

    const [remoteOperationStatus] =
        getMappedStatusDigitalOutputs(generatorProps);

    // USEREF TO CHECK ().CURRENT OF REF AND COMPARE WITH MAPPED STATUS
    const previousRemoteOperationStatus = useRef<boolean | undefined>(
        remoteOperationStatus
    );
    const previousCommercialPower = useRef<string | undefined>(commercialPower);
    const previousDEGMode = useRef<string | undefined>(degMode);
    const previousDEGStatus = useRef<string | undefined>(degStatus);
    const previousRemoteOperation = useRef<string | undefined>(remoteOperation);
    const previousLoadOn = useRef<string | undefined>(loadOn);
    const previousFuelLevel = useRef<string | undefined>(fuelLevel);
    const previousPowerSupply = useRef<string | undefined>(powerSupply);
    const previousCommercialPowerDC = useRef<string | undefined>(
        commercialPowerDC
    );
    const previousBatteryTemp = useRef<string | undefined>(batteryTemp);

    useEffect(() => {
        console.log(statusLogs);
        console.log(
            "PREVIOUS REMOTE STATUS (REMORTEOPERATIONSTATUS)",
            remoteOperationStatus
        );
        if (remoteOperationStatus != null) {
            if (previousRemoteOperationStatus.current == undefined) {
                previousRemoteOperationStatus.current = remoteOperationStatus;
                previousCommercialPower.current = commercialPower;
                previousDEGMode.current = degMode;
                previousDEGStatus.current = degStatus;
                previousRemoteOperation.current = remoteOperation;
                previousLoadOn.current = loadOn;
                previousFuelLevel.current = fuelLevel;
                previousPowerSupply.current = powerSupply;
                previousCommercialPowerDC.current = commercialPowerDC;
                previousBatteryTemp.current = batteryTemp;
            }

            // CREATE STATUS LOG IF REMOTE OPERATION STARTS OR STOPS
            if (
                previousRemoteOperationStatus.current != remoteOperationStatus
            ) {
                previousRemoteOperationStatus.current = remoteOperationStatus;
                mutate({
                    generatorId: generatorProps.generatorId ?? 0,
                    status: getStatusDEG(remoteOperationStatus),
                    status_type: "success",
                    status_msg: "Diesel Generator remote operation",
                });
            }

            // CREATE STATUS LOG IF COMMERCIAL POWER CHANGES
            if (previousCommercialPower.current != commercialPower) {
                mutate({
                    generatorId: generatorProps.generatorId ?? 0,
                    status: commercialPower,
                    status_type: "info",
                    status_msg: "Commercial Power is",
                });
                previousCommercialPower.current = commercialPower;
            }

            // CREATE STATUS LOG IF DEG MODE CHANGES
            if (previousDEGMode.current != degMode) {
                previousDEGMode.current = degMode;
                mutate({
                    generatorId: generatorProps.generatorId ?? 0,
                    status: degMode,
                    status_type: getStatusTypeDEG(degMode) ?? "info",
                    status_msg: "DEG Mode is",
                });
            }

            // CREATE STATUS LOG IF DEG STATUS CHANGES
            if (previousDEGStatus.current != degStatus) {
                previousDEGStatus.current = degStatus;
                mutate({
                    generatorId: generatorProps.generatorId ?? 0,
                    status: degStatus,
                    status_type: getStatusTypeDEG(degStatus) ?? "info",
                    status_msg: "DEG Status is",
                });
            }

            // CREATE STATUS LOG IF REMOTE OPERATION CHANGES
            if (previousRemoteOperation.current != remoteOperation) {
                previousRemoteOperation.current = remoteOperation;
                mutate({
                    generatorId: generatorProps.generatorId ?? 0,
                    status: remoteOperation,
                    status_type:
                        getStatusTypeRemoteOperationToFuelLevel(
                            remoteOperation
                        ) ?? "info",
                    status_msg: "Remote Operation is ",
                });
            }

            // CREATE STATUS LOG IF LOAD ON CHANGES
            if (previousLoadOn.current != loadOn) {
                previousLoadOn.current = loadOn;
                mutate({
                    generatorId: generatorProps.generatorId ?? 0,
                    status: loadOn,
                    status_type:
                        getStatusTypeRemoteOperationToFuelLevel(loadOn) ??
                        "info",
                    status_msg: "Load On ",
                });
            }

            // CREATE STATUS LOG IF LOAD ON CHANGES
            if (previousFuelLevel.current != fuelLevel) {
                previousFuelLevel.current = fuelLevel;
                mutate({
                    generatorId: generatorProps.generatorId ?? 0,
                    status: fuelLevel,
                    status_type:
                        getStatusTypeRemoteOperationToFuelLevel(fuelLevel) ??
                        "info",
                    status_msg: "Fuel Level is ",
                });
            }
        }
    }, [
        remoteOperationStatus,
        commercialPower,
        degMode,
        degStatus,
        remoteOperation,
        loadOn,
        fuelLevel,
    ]);

    const globalDegStatus = degStatus;
    const globalLoadStatus = loadOn;

    return (
        <div className=" m-3 flex h-full w-1/3 flex-col overflow-clip rounded-2xl border-2 border-[#575757] bg-[#3E3E3E] pb-5 text-sm font-bold tracking-widest">
            <div className=" sticky top-0 z-40 mb-7 flex h-20 w-full items-center justify-center bg-[#575757] text-center text-2xl font-normal uppercase tracking-widest">
                {generatorProps.generatorName}
            </div>
            <h1>{previousFuelLevel.current + " "}</h1>
            <h1>{fuelLevel + " "}</h1>
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
                    disabled={false}
                />
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

            <div className="text-md m-5 flex h-fit flex-col space-y-5 rounded-xl bg-base-100 p-3 tracking-normal">
                <h1 className="text-sm font-semibold tracking-[0.2em]">
                    GRAPHICAL REPORT
                </h1>
                <LineChartExample
                    generatorId={generatorProps.generatorId}
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

                {/* {statusLogs && (
                    statusLogs
                )} */}

                {Object.entries(statusLogs?.groupedLogs ?? {}).map(
                    ([date, items]) => (
                        <div key={date}>
                            <StatusDayLog
                                id={date}
                                day={date}
                                statusLogSet={items.map(
                                    (item: StatusLogType) => ({
                                        id: item.id,
                                        time: item.createdAt.toLocaleTimeString(
                                            [],
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        ),
                                        statusType: item.status_type,
                                        content: item.status_msg,
                                        statusName: item.status,
                                    })
                                )}
                            />
                        </div>
                    )
                )}
                {/* <StatusDayLog
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
                /> */}
            </div>
        </div>
    );
};

export default Generator1;
