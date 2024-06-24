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
    getTestMappedStatusXR1,
    getMappedStatusDigitalOutputsXR1,
    getStatusTypeDC48V,
} from "~/utils/functions";
import LineChartExample from "./LineChart";
import { useEffect, useRef, useState } from "react";
import { useDieselGenStart } from "~/utils/useStore";
import { api } from "~/utils/api";
import { getStatusType } from "./StatusCard";
import { Pagination } from "@mantine/core";
import { DegStatus } from "~/utils/enums";
import ModalDashboardStatus from "./ModalDashboardStatus";
import { useSession } from "next-auth/react";

const Generator2 = (generatorProps: TestGenerator) => {
    // const [testDataFloat, setTestDataFloat] = useState<Array<TestStatusFloat> | null>(null);
    const { genStart, setGenStart } = useDieselGenStart();
    const [page, setPage] = useState(1)
    const [openLogsModal, setOpenLogsModal] = useState<boolean>(false)
    const [showMoreIsVisible, setShowMoreIsVisible] = useState<boolean>(false)
    const [modalDashboardStatusOpen, setModalDashboardStatusOpen] = useState<boolean>(false)

    // MUTATE FUNCTION FOR LOGS TAKEN FROM GENERATOR ROUTER
    const { mutate } = api.generator.createLog.useMutation({
        async onSuccess() {
            await refetchLogs();
        },
    });

    // MUTATE FUNCTION FOR CURRENT STATUS IN THE BACKEND TO BE CHECKED WITH STATUS FROM API
    const { mutate: mutateGeneratorStatus } = api.generator.generatorStatusUpdate.useMutation({
        async onSuccess() {
            await refetchLogs();
        },
    });

    const { data: session } = useSession();

    const { data: userSessions, refetch: refetchUserSessions } =
        api.account.findAllUserSessions.useQuery()

    const { data: generatorStatuses, refetch: refetchGeneratorStatuses } = api.generator.generatorStatuses.useQuery(
        {
            generatorId: generatorProps.generatorId
        }
    )

    // DATA OF ALL LOGS AND REFETCH FUNCTION FOR LOGS
    const { data: statusLogs, refetch: refetchLogs } =
        api.generator.findAllLogs.useQuery({
            filter: {
                generatorId: generatorProps.generatorId,
            },
            page: page,
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
    ] = getTestMappedStatusXR1(generatorProps);

    const [remoteOperationStatus] =
        getMappedStatusDigitalOutputsXR1(generatorProps);


    useEffect(() => {
        if (degStatus == "FAILED") {
            setModalDashboardStatusOpen(true)
        }
    }, [degStatus])

    useEffect(() => {
        void refetchGeneratorStatuses()
    }, [
        generatorStatuses,
    ])

    // MUTATING BACKEND STATUS AND LOGS FOR COMMERCIAL POWER, BY REFETCHING DATA OF GENERATOR STATUSES
    useEffect(() => {
        if (commercialPower != null && commercialPower != "") {
            if (generatorStatuses) {
                refetchGeneratorStatuses().then((res) => {
                    // console.log(res.data?.commercialPower?.current_status, "BACK-END STATUS")
                    // console.log(commercialPower, "API STATUS")
                    if (res.data?.commercialPower?.current_status != commercialPower) {
                        // CHANGE STATUS VALUE IN BACKEND
                        mutateGeneratorStatus({
                            statusId: generatorStatuses?.commercialPower?.id ?? 10,
                            generatorId: generatorProps.generatorId,
                            status_name: "commercialPower",
                            status_value: commercialPower,
                        })

                        mutate({
                            generatorId: generatorProps.generatorId ?? 0,
                            status: commercialPower,
                            status_type: "info",
                            status_msg: "DEG Commercial Power is",
                        });
                        // previousCommercialPower.current = commercialPower
                    }

                }
                ).catch(error => console.log(error))

            }

        }
    }, [commercialPower]);

    // MUTATING BACKEND STATUS AND LOGS FOR DEG MODE, BY REFETCHING DATA OF GENERATOR STATUSES
    useEffect(() => {
        if (degMode != null && degMode != "") {

            if (generatorStatuses) {
                refetchGeneratorStatuses().then((res) => {
                    console.log(res.data?.degMode?.current_status, "BACK-END STATUS")
                    console.log(degMode, "API STATUS")

                    if (res.data?.degMode?.current_status != degMode) {
                        mutateGeneratorStatus({
                            statusId: generatorStatuses?.degMode?.id ?? 11,
                            generatorId: generatorProps.generatorId,
                            status_name: "degMode",
                            status_value: degMode,
                        })

                        mutate({
                            generatorId: generatorProps.generatorId ?? 0,
                            status: degMode,
                            status_type: getStatusTypeDEG(degMode) ?? "info",
                            status_msg: "DEG Mode is",

                        });
                    }

                }
                ).catch(error => console.log(error))
            }
        }
    }, [degMode])

    // MUTATING BACKEND STATUS AND LOGS FOR DEG STATUS, BY REFETCHING DATA OF GENERATOR STATUSES
    useEffect(() => {
        if (degStatus != null && degStatus != "") {

            if (generatorStatuses) {
                refetchGeneratorStatuses().then((res) => {
                    // console.log(res.data?.degStatus?.current_status, "BACK-END STATUS")
                    // console.log(degStatus, "API STATUS")
                    if (res.data?.degStatus?.current_status != degStatus) {
                        mutateGeneratorStatus({
                            statusId: generatorStatuses?.degStatus?.id ?? 12,
                            generatorId: generatorProps.generatorId,
                            status_name: "degStatus",
                            status_value: degStatus,
                        })

                        mutate({
                            generatorId: generatorProps.generatorId ?? 0,
                            status: degStatus,
                            status_type: getStatusTypeDEG(degStatus) ?? "info",
                            status_msg: "DEG Status is",

                        });

                    }

                }
                ).catch(error => console.log(error))
            }
        }
    }, [degStatus])

    // MUTATING BACKEND STATUS AND LOGS FOR REMOTE OPERATION, BY REFETCHING DATA OF GENERATOR STATUSES
    useEffect(() => {
        if (remoteOperation != null && remoteOperation != "") {

            if (generatorStatuses) {
                refetchGeneratorStatuses().then((res) => {
                    // console.log(res.data?.remoteOperation?.current_status, "BACK-END STATUS")
                    // console.log(remoteOperation, "API STATUS")

                    if (res.data?.remoteOperation?.current_status != remoteOperation) {
                        mutateGeneratorStatus({
                            statusId: generatorStatuses?.remoteOperation?.id ?? 13,
                            generatorId: generatorProps.generatorId,
                            status_name: "remoteOperation",
                            status_value: remoteOperation,
                        })

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


                }
                ).catch(error => console.log(error))
            }
        }
    }, [remoteOperation])

    // MUTATING BACKEND STATUS AND LOGS FOR LOAD ON, BY REFETCHING DATA OF GENERATOR STATUSES
    useEffect(() => {
        if (loadOn != null && loadOn != "") {

            if (generatorStatuses) {
                refetchGeneratorStatuses().then((res) => {
                    // console.log(res.data?.loadOn?.current_status, "BACK-END STATUS")
                    // console.log(loadOn, "API STATUS")

                    if (res.data?.loadOn?.current_status != loadOn) {
                        mutateGeneratorStatus({
                            statusId: generatorStatuses?.loadOn?.id ?? 14,
                            generatorId: generatorProps.generatorId,
                            status_name: "loadOn",
                            status_value: loadOn,
                        })

                        mutate({
                            generatorId: generatorProps.generatorId ?? 0,
                            status: loadOn,
                            status_type:
                                getStatusTypeRemoteOperationToFuelLevel(loadOn) ??
                                "info",
                            status_msg: "Load On ",

                        });
                    }
                }
                ).catch(error => console.log(error))
            }
        }
    }, [loadOn])

    // MUTATING BACKEND STATUS AND LOGS FOR FUEL LEVEL, BY REFETCHING DATA OF GENERATOR STATUSES
    useEffect(() => {
        if (fuelLevel != null && fuelLevel != "") {

            if (generatorStatuses) {
                refetchGeneratorStatuses().then((res) => {
                    // console.log(res.data?.fuelLevel?.current_status, "BACK-END STATUS")
                    // console.log(fuelLevel, "API STATUS")

                    if (res.data?.fuelLevel?.current_status != fuelLevel) {
                        mutateGeneratorStatus({
                            statusId: generatorStatuses?.fuelLevel?.id ?? 15,
                            generatorId: generatorProps.generatorId,
                            status_name: "fuelLevel",
                            status_value: fuelLevel,
                        })

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
                ).catch(error => console.log(error))
            }
        }
    }, [fuelLevel])


    // MUTATING BACKEND STATUS AND LOGS FOR FUEL LEVEL, BY REFETCHING DATA OF GENERATOR STATUSES
    useEffect(() => {
        if (powerSupply != null && powerSupply != "") {
            if (generatorStatuses) {
                refetchGeneratorStatuses().then((res) => {
                    // console.log(res.data?.powerSupply?.current_status, "BACK-END STATUS")
                    // console.log(powerSupply, "API STATUS")

                    if (res.data?.powerSupply?.current_status != powerSupply) {
                        mutateGeneratorStatus({
                            statusId: generatorStatuses?.powerSupply?.id ?? 16,
                            generatorId: generatorProps.generatorId,
                            status_name: "powerSupply",
                            status_value: powerSupply,
                        })
                        mutate({
                            generatorId: generatorProps.generatorId ?? 0,
                            status: powerSupply,
                            status_type: getStatusTypeDC48V(powerSupply) ?? "info",
                            status_msg: "DC 48v Power Supply is",
                        });
                    }
                }

                ).catch(error => console.log(error))
            }
        }
    }, [powerSupply])


    // MUTATING BACKEND STATUS AND LOGS FOR COMMERCIAL POWER DC, BY REFETCHING DATA OF GENERATOR STATUSES
    useEffect(() => {
        if (commercialPowerDC != null && commercialPowerDC != "") {
            if (generatorStatuses) {
                refetchGeneratorStatuses().then((res) => {
                    console.log(res.data?.commercialPowerDC?.current_status, "BACK-END STATUS")
                    console.log(commercialPowerDC, "API STATUS")

                    if (res.data?.commercialPowerDC?.current_status != commercialPowerDC) {
                        mutateGeneratorStatus({
                            statusId: generatorStatuses?.commercialPowerDC?.id ?? 17,
                            generatorId: generatorProps.generatorId,
                            status_name: "commercialPowerDC",
                            status_value: commercialPowerDC,
                        })
                        mutate({
                            generatorId: generatorProps.generatorId ?? 0,
                            status: commercialPowerDC,
                            status_type: "info",
                            status_msg: "DC 48v Commercial Power is",
                        });
                    }
                }

                ).catch(error => console.log(error))
            }
        }
    }, [commercialPowerDC])


    // MUTATING BACKEND STATUS AND LOGS FOR COMMERCIAL POWER DC, BY REFETCHING DATA OF GENERATOR STATUSES
    useEffect(() => {
        if (batteryTemp != null && batteryTemp != "") {

            if (generatorStatuses) {
                refetchGeneratorStatuses().then((res) => {
                    console.log(res.data?.batteryTemp?.current_status, "BACK-END STATUS")
                    console.log(batteryTemp, "API STATUS")

                    if (res.data?.batteryTemp?.current_status != batteryTemp) {
                        mutateGeneratorStatus({
                            statusId: generatorStatuses?.batteryTemp?.id ?? 18,
                            generatorId: generatorProps.generatorId,
                            status_name: "batteryTemp",
                            status_value: batteryTemp,
                        })

                        mutate({
                            generatorId: generatorProps.generatorId ?? 0,
                            status: batteryTemp,
                            status_type: getStatusTypeDC48V(batteryTemp) ?? "info",
                            status_msg: "DC 48v Battery Temperature is",
                        });
                    }
                }

                ).catch(error => console.log(error))
            }

        }
    }, [batteryTemp])

    useEffect(() => {
        void refetchLogs()
    })


    useEffect(() => {
        // if (session?.user.type == "Logger") {
        if (generatorStatuses) {
            refetchGeneratorStatuses().then((res) => {
                if (generatorProps.generatorError) {
                    if (res.data?.genStatus2?.current_status != 'DOWN') {
                        mutateGeneratorStatus({
                            statusId: generatorStatuses?.genStatus2?.id ?? 29,
                            generatorId: generatorProps.generatorId,
                            status_name: "genStatus",
                            status_value: "DOWN",
                        });
                        mutate({
                            generatorId: generatorProps.generatorId ?? 0,
                            status: "DOWN",
                            status_type: "error",
                            status_msg: "Site XR1 is currently",
                        });
                    }
                } else {
                    void refetchLogs()
                }
            }
            ).catch(error => console.log(error))
        }
        // }
    }, [generatorProps.generatorError])


    const globalDegStatus = degStatus;
    const globalLoadStatus = loadOn;
    const globalCommercialPower = commercialPower;

    useEffect(() => {
        if (openLogsModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [openLogsModal])

    useEffect(() => {
        if (statusLogs)
            if (statusLogs?.count > 10) {
                setShowMoreIsVisible(true)
            } else {
                setShowMoreIsVisible(false)
            }
    }, [statusLogs?.count])

    return (
        <div className=" m-3 flex h-full w-1/3 flex-col overflow-clip rounded-2xl border-2 border-[#575757] bg-[#3E3E3E] pb-5 text-sm font-bold tracking-widest">
            <div className=" sticky top-0 z-40 flex h-20 w-full items-center justify-center bg-[#575757] text-center text-2xl font-normal uppercase tracking-widest">
                {generatorProps.generatorName}
            </div>

            <div className="mt-7">
                {degStatus == "FAILED" &&
                    <ModalDashboardStatus
                        isModalOpen={degStatus == "FAILED"}
                        closeModal={() =>
                            setModalDashboardStatusOpen(false)
                        }
                        modalStatus="FAILED"
                    ></ModalDashboardStatus>}

                {/* Generator Control Status */}
                <div className="text-md m-5 flex flex-col space-y-5 rounded-xl bg-base-100 p-5">
                    <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                        Generator Control Status
                    </h1>
                    <GeneratorControlStatus
                        /* eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment */
                        refetch={generatorProps.refetch}
                        refetchLogs={refetchLogs}
                        id={generatorProps.generatorId}
                        runningHours={generatorProps.runningHours}
                        degStatus={degStatus}
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
                        commercialPower={globalCommercialPower}
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
                        refetch={refetchLogs}
                        generatorId={generatorProps.generatorId ?? 0}
                        remoteOperationStatus={degStatus == "GENERATING"}
                        standby={commercialPower == "OFF" || degMode == "MANUAL" ? true : false}
                        disabled={remoteOperation == "NA" || degMode == "MANUAL" || degStatus == "FAILED"}
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
                        /* eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment */
                        refetch={generatorProps.refetch}
                        commercialPower={commercialPower}
                        degStatus={degStatus}
                        fuelLevel={fuelLevel}
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
                                            id: String(item.id),
                                            time: item.createdAt,
                                            statusType: item.status_type,
                                            content: item.status_msg,
                                            statusName: item.status,
                                        })
                                    )}
                                />
                            </div>
                        )
                    )}

                    {showMoreIsVisible &&
                        <button
                            className="border border-info rounded text-info mx-auto px-5 py-2"
                            onClick={() => setOpenLogsModal(true)}
                        >SHOW MORE</button>
                    }
                </div>

                {openLogsModal &&
                    (
                        <div className="fixed inset-0 z-50 overflow-y-auto">
                            <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                                <div
                                    className="fixed inset-0 transition-opacity"
                                    aria-hidden="true"
                                >
                                    <div className="absolute inset-0 bg-black opacity-75"></div>
                                </div>
                                <span
                                    className="hidden sm:inline-block sm:h-screen sm:align-middle"
                                    aria-hidden="true"
                                >
                                    &#8203;
                                </span>
                                {/* header and affects upper header colors */}
                                <div
                                    className="h-fit inline-block md:w-[80%] transform overflow-hidden rounded-lg bg-base-100 px-8 align-middle shadow-xl transition-all sm:my-8"
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="modal-headline"
                                >
                                    <div className="bg-base-100 px-3 py-7 h-[90vh] overflow-y-auto">
                                        <div className="flex flex-col h-full ">
                                            <h1 className="text-left text-2xl">{generatorProps.generatorName}</h1>
                                            <h2 className="text-left font-normal">STATUS LOGS</h2>

                                            <div className=" w-full text-center sm:mt-0 h-fit overflow-auto">
                                                <div
                                                    className="flex w-full flex-col gap-5"
                                                >
                                                    <table className="border-separate border-spacing-x-0 border-spacing-y-3 ">
                                                        <thead>
                                                            <tr className=" bg-[#616161] sticky top-0">
                                                                <th className="p-3 rounded-tl-lg rounded-bl-lg font-semibold text-lg">DATE / TIME</th>
                                                                <th className="p-3 rounded-tr-lg rounded-br-lg font-semibold text-lg text-left">STATUS MESSAGE</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {statusLogs?.logs.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td className={"font-normal bg-secondary rounded-tl-lg rounded-bl-lg p-4 border-l-[8px] " + getStatusType(item.status_type ?? "")[1]}>
                                                                        <div>
                                                                            {String(item.createdAt.toLocaleString())}
                                                                        </div>
                                                                    </td>
                                                                    <td className="bg-secondary rounded-tr-lg rounded-br-lg p-4 text-left">
                                                                        <div className="mr-4 text-sm font-normal">
                                                                            {item.status_msg + " "}
                                                                            <span className={"font-semibold " + getStatusType(item.status_type ?? "")[0]}>
                                                                                {item.status}
                                                                            </span>
                                                                            .
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <>
                                                    Showing 30 of {statusLogs?.count}
                                                </>
                                                <Pagination
                                                    value={page}
                                                    total={Math.ceil(Number(statusLogs?.count ?? 0) / 10)}
                                                    color="gray"
                                                    onChange={(event) => {
                                                        setPage(event)
                                                        // refetchLogs()
                                                    }}
                                                ></Pagination>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" bg-base-100 px-4 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            onClick={() => setOpenLogsModal(false)}
                                            className="btn btn-circle btn-ghost btn-sm absolute right-10 top-7 text-2xl"
                                        >
                                            {/* unicode for X button */}
                                            &#10005;
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
        </div >
    );
};

export default Generator2;

// LEGACY CODE FOR MUTATING LOGS!!!
// // USEREF TO CHECK ().CURRENT OF REF AND COMPARE WITH MAPPED STATUS
// const previousRemoteOperationStatus = useRef<boolean | undefined>(
//     remoteOperationStatus
// );
// const previousCommercialPower = useRef<string | undefined>(commercialPower);
// const previousDEGMode = useRef<string | undefined>(degMode);
// const previousDEGStatus = useRef<string | undefined>(degStatus);
// const previousRemoteOperation = useRef<string | undefined>(remoteOperation);
// const previousLoadOn = useRef<string | undefined>(loadOn);
// const previousFuelLevel = useRef<string | undefined>(fuelLevel);
// const previousPowerSupply = useRef<string | undefined>(powerSupply);
// const previousCommercialPowerDC = useRef<string | undefined>(
//     commercialPowerDC
// );
// const previousBatteryTemp = useRef<string | undefined>(batteryTemp);
// const [dataLoaded, setDataLoaded] = useState<boolean>(false);
// useEffect(() => {
//     // console.log(statusLogs);
//     // console.log(
//     //     "PREVIOUS REMOTE STATUS (REMORTEOPERATIONSTATUS)",
//     //     remoteOperationStatus
//     // );
//     // if (remoteOperationStatus != null) {
//     console.log(session?.user.sessionNum)
//     console.log(userSessions?.sessions[userSessions.sessions.length - 1]?.id)
//     if (
//         // GENERATOR STATUS
//         (commercialPower != null && commercialPower != "") &&
//         (degMode != null && degMode != "") &&
//         (degStatus != null && degStatus != "") &&
//         (remoteOperation != null && remoteOperation != "") &&
//         (loadOn != null && loadOn != "") &&
//         (fuelLevel != null && fuelLevel != "") &&
//         // POWER SUPPLY STATUS
//         (powerSupply != null && powerSupply != "") &&
//         (commercialPowerDC != null && commercialPowerDC != "") &&
//         (batteryTemp != null && batteryTemp != "")
//     ) {
//         if (dataLoaded == false) {
//             // GENERATOR STATUS
//             previousRemoteOperationStatus.current = remoteOperationStatus;
//             previousCommercialPower.current = commercialPower;
//             previousDEGMode.current = degMode;
//             previousDEGStatus.current = degStatus;
//             previousRemoteOperation.current = remoteOperation;
//             previousLoadOn.current = loadOn;
//             previousFuelLevel.current = fuelLevel;
//             // POWER SUPPLY STATUS
//             previousPowerSupply.current = powerSupply;
//             previousCommercialPowerDC.current = commercialPowerDC;
//             previousBatteryTemp.current = batteryTemp;
//             setDataLoaded(true)
//             return;
//         }

//         else {
//             if (session?.user.type == "Logger") {
//                 // if (Number(sessionNum) == userSessions?.sessions[userSessions.sessions.length - 1]?.id) {
//                 // CREATE STATUS LOG IF REMOTE OPERATION STARTS OR STOPS
//                 // if (
//                 //     previousRemoteOperationStatus.current != remoteOperationStatus
//                 // ) {
//                 //     previousRemoteOperationStatus.current = remoteOperationStatus;
//                 //     mutate({
//                 //         generatorId: generatorProps.generatorId ?? 0,
//                 //         status: getStatusDEG(remoteOperationStatus ?? false),
//                 //         status_type: "success",
//                 //         status_msg: "Diesel Generator remote operation",
//                 //     });
//                 // }

//                 // CREATE STATUS LOG IF COMMERCIAL POWER CHANGES

//                 if (previousCommercialPower.current != commercialPower) {
//                     mutate({
//                         generatorId: generatorProps.generatorId ?? 0,
//                         status: commercialPower,
//                         status_type: "info",
//                         status_msg: "DEG Commercial Power is",
//                     });
//                     previousCommercialPower.current = commercialPower;
//                 }

//                 // CREATE STATUS LOG IF DEG MODE CHANGES
//                 if (previousDEGMode.current != degMode) {
//                     previousDEGMode.current = degMode;
//                     mutate({
//                         generatorId: generatorProps.generatorId ?? 0,
//                         status: degMode,
//                         status_type: getStatusTypeDEG(degMode) ?? "info",
//                         status_msg: "DEG Mode is",

//                     });
//                 }

//                 // CREATE STATUS LOG IF DEG STATUS CHANGES
//                 if (previousDEGStatus.current != degStatus) {
//                     mutate({
//                         generatorId: generatorProps.generatorId ?? 0,
//                         status: degStatus,
//                         status_type: getStatusTypeDEG(degStatus) ?? "info",
//                         status_msg: "DEG Status is",

//                     });
//                     // console.log("DEG STATUS CHANGED")
//                     previousDEGStatus.current = degStatus;
//                 }

//                 // CREATE STATUS LOG IF REMOTE OPERATION CHANGES
//                 if (previousRemoteOperation.current != remoteOperation) {
//                     previousRemoteOperation.current = remoteOperation;
//                     mutate({
//                         generatorId: generatorProps.generatorId ?? 0,
//                         status: remoteOperation,
//                         status_type:
//                             getStatusTypeRemoteOperationToFuelLevel(
//                                 remoteOperation
//                             ) ?? "info",
//                         status_msg: "Remote Operation is ",

//                     });
//                 }

//                 // CREATE STATUS LOG IF LOAD ON CHANGES
//                 if (previousLoadOn.current != loadOn) {
//                     previousLoadOn.current = loadOn;
//                     mutate({
//                         generatorId: generatorProps.generatorId ?? 0,
//                         status: loadOn,
//                         status_type:
//                             getStatusTypeRemoteOperationToFuelLevel(loadOn) ??
//                             "info",
//                         status_msg: "Load On ",

//                     });
//                 }


//                 // CREATE STATUS LOG IF FUEL LEVEL CHANGES
//                 if (previousFuelLevel.current != fuelLevel) {
//                     previousFuelLevel.current = fuelLevel;
//                     mutate({
//                         generatorId: generatorProps.generatorId ?? 0,
//                         status: fuelLevel,
//                         status_type:
//                             getStatusTypeRemoteOperationToFuelLevel(fuelLevel) ??
//                             "info",
//                         status_msg: "Fuel Level is ",

//                     });
//                 }

//                 // STATUS LOGS FOR DC 48V
//                 // CREATE STATUS LOG IF POWER SUPPLY STATUS CHANGES
//                 if (previousPowerSupply.current != powerSupply) {
//                     mutate({
//                         generatorId: generatorProps.generatorId ?? 0,
//                         status: powerSupply,
//                         status_type: getStatusTypeDC48V(powerSupply) ?? "info",
//                         status_msg: "DC 48v Power Supply is",
//                     });
//                     previousPowerSupply.current = powerSupply;

//                 }

//                 // CREATE STATUS LOG IF COMMERCIAL POWER DC CHANGES
//                 if (previousCommercialPowerDC.current != commercialPowerDC) {
//                     mutate({
//                         generatorId: generatorProps.generatorId ?? 0,
//                         status: commercialPowerDC,
//                         status_type: "info",
//                         status_msg: "DC 48v Commercial Power is",
//                     });
//                     previousCommercialPowerDC.current = commercialPowerDC;

//                 }


//                 // CREATE STATUS LOG IF BATTERY TEMPERATURE CHANGES
//                 if (previousBatteryTemp.current != batteryTemp) {
//                     mutate({
//                         generatorId: generatorProps.generatorId ?? 0,
//                         status: batteryTemp,
//                         status_type: getStatusTypeDC48V(batteryTemp) ?? "info",
//                         status_msg: "DC 48v Battery Temperature is",
//                     });
//                     previousBatteryTemp.current = batteryTemp;

//                 }
//                 // }
//             }
//         }
//     }

// }, [
//     remoteOperationStatus,
//     commercialPower,
//     degMode,
//     degStatus,
//     remoteOperation,
//     loadOn,
//     fuelLevel,
//     powerSupply,
//     commercialPowerDC,
//     batteryTemp
// ]);
