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
import { useEffect, useRef, useState } from "react";
import { useDieselGenStart } from "~/utils/useStore";
import { api } from "~/utils/api";
import { getStatusType } from "./StatusCard";
import { Pagination } from "@mantine/core";
import { DegStatus } from "~/utils/enums";
import ModalDashboardStatus from "./ModalDashboardStatus";

const Generator1 = (generatorProps: TestGenerator) => {
    // const [testDataFloat, setTestDataFloat] = useState<Array<TestStatusFloat> | null>(null);
    const { genStart, setGenStart } = useDieselGenStart();
    const [page, setPage] = useState(1);
    const [openLogsModal, setOpenLogsModal] = useState<boolean>(false);
    const [showMoreIsVisible, setShowMoreIsVisible] = useState<boolean>(false);
    const [modalDashboardStatusOpen, setModalDashboardStatusOpen] =
        useState<boolean>(false);

    // MUTATE FUNCTION FOR LOGS TAKEN FROM GENERATOR ROUTER
    const { mutate } = api.generator.createLog.useMutation({
        async onSuccess() {
            await refetchLogs();
        },
    });

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
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (degStatus == "FAILED") {
            setModalDashboardStatusOpen(true);
        }
    }, [degStatus]);

    useEffect(() => {
        // console.log(statusLogs);
        // console.log(
        //     "PREVIOUS REMOTE STATUS (REMORTEOPERATIONSTATUS)",
        //     remoteOperationStatus
        // );
        // if (remoteOperationStatus != null) {
        if (
            remoteOperationStatus != null &&
            commercialPower != null &&
            degMode != null &&
            degStatus != null &&
            remoteOperation != null &&
            loadOn != null &&
            fuelLevel != null
        ) {
            if (dataLoaded == false) {
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
                setDataLoaded(true);
                return;
            } else {
                // CREATE STATUS LOG IF REMOTE OPERATION STARTS OR STOPS
                if (
                    previousRemoteOperationStatus.current !=
                    remoteOperationStatus
                ) {
                    previousRemoteOperationStatus.current =
                        remoteOperationStatus;
                    mutate({
                        generatorId: generatorProps.generatorId ?? 0,
                        status: getStatusDEG(remoteOperationStatus ?? false),
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
                            getStatusTypeRemoteOperationToFuelLevel(
                                fuelLevel
                            ) ?? "info",
                        status_msg: "Fuel Level is ",
                    });
                }
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

    useEffect(() => {
        if (openLogsModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [openLogsModal]);

    useEffect(() => {
        if (statusLogs)
            if (statusLogs?.count > 10) {
                setShowMoreIsVisible(true);
            } else {
                setShowMoreIsVisible(false);
            }
    }, [statusLogs?.count]);

    return (
        <div className=" m-3 flex h-full w-1/3 flex-col overflow-clip rounded-2xl border-2 border-[#575757] bg-[#3E3E3E] pb-5 text-sm font-bold tracking-widest">
            <div className=" sticky top-0 z-50 flex h-20 w-full items-center justify-center bg-[#575757] text-center text-2xl font-normal uppercase tracking-widest">
                {generatorProps.generatorName}
            </div>

            <div className="mt-7">
                {degStatus == "FAILED" && (
                    <ModalDashboardStatus
                        isModalOpen={degStatus == "FAILED"}
                        closeModal={() => setModalDashboardStatusOpen(false)}
                        modalStatus="FAILED"
                    ></ModalDashboardStatus>
                )}

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
                        generatorId={generatorProps.generatorId ?? 0}
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
                        /* eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment */
                        refetch={generatorProps.refetch}
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

                    {showMoreIsVisible && (
                        <button
                            className="mx-auto rounded border border-info px-5 py-2 text-info"
                            onClick={() => setOpenLogsModal(true)}
                        >
                            SHOW MORE
                        </button>
                    )}
                </div>
                {openLogsModal && (
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
                                className="inline-block h-fit transform overflow-hidden rounded-lg bg-base-100 px-8 align-middle shadow-xl transition-all sm:my-8 md:w-[80%]"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-headline"
                            >
                                <div className="h-[90vh] overflow-y-auto bg-base-100 px-3 py-7">
                                    <div className="flex h-full flex-col ">
                                        <h1 className="text-left text-2xl">
                                            {generatorProps.generatorName}
                                        </h1>
                                        <h2 className="text-left font-normal">
                                            STATUS LOGS
                                        </h2>

                                        <div className=" h-fit w-full overflow-auto text-center sm:mt-0">
                                            <div className="flex w-full flex-col gap-5">
                                                <table className="border-separate border-spacing-x-0 border-spacing-y-3 ">
                                                    <thead>
                                                        <tr className=" sticky top-0 bg-[#616161]">
                                                            <th className="rounded-bl-lg rounded-tl-lg p-3 text-lg font-semibold">
                                                                DATE / TIME
                                                            </th>
                                                            <th className="rounded-br-lg rounded-tr-lg p-3 text-left text-lg font-semibold">
                                                                STATUS MESSAGE
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {statusLogs?.logs.map(
                                                            (item, index) => (
                                                                <tr key={index}>
                                                                    <td
                                                                        className={
                                                                            "rounded-bl-lg rounded-tl-lg border-l-[8px] bg-secondary p-4 font-normal " +
                                                                            getStatusType(
                                                                                item.status_type ??
                                                                                    ""
                                                                            )[1]
                                                                        }
                                                                    >
                                                                        <div>
                                                                            {String(
                                                                                item.createdAt.toLocaleString()
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td className="rounded-br-lg rounded-tr-lg bg-secondary p-4 text-left">
                                                                        <div className="mr-4 text-sm font-normal">
                                                                            {item.status_msg +
                                                                                " "}
                                                                            <span
                                                                                className={
                                                                                    "font-semibold " +
                                                                                    getStatusType(
                                                                                        item.status_type ??
                                                                                            ""
                                                                                    )[0]
                                                                                }
                                                                            >
                                                                                {
                                                                                    item.status
                                                                                }
                                                                            </span>
                                                                            .
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex justify-between">
                                            <>
                                                Showing 10 of{" "}
                                                {statusLogs?.count}
                                            </>
                                            <Pagination
                                                value={page}
                                                total={Math.ceil(
                                                    Number(
                                                        statusLogs?.count ?? 0
                                                    ) / 10
                                                )}
                                                color="gray"
                                                onChange={(event) => {
                                                    setPage(event);
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
                )}
            </div>
        </div>
    );
};

export default Generator1;
