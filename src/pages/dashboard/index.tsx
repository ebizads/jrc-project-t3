import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import GeneratorControlStatus from "~/components/GeneratorControlStatus";
import PowerSupplyStatus from "~/components/PowerSupplyStatus";
import RemoteOperation from "~/components/RemoteOperation";
import StatusCard from "~/components/StatusCard";
import StatusDayLog from "~/components/StatusDayLog";
import StatusDiagram from "~/components/StatusDiagram";
import TestSwitch from "~/components/TestSwitch";

import { api } from "~/utils/api";
import { Status } from "~/utils/types";

export default function Home() {
    // const hello = api.post.hello.useQuery({ text: "from tRPC" });

    return (
        <>
            <div>
                <Head>
                    <title>JRC Monitoring & Control System Dashboard</title>
                    <meta
                        name="description"
                        content="JRC Monitoring Dashboard"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="icon" href="/jrc-icon.svg" />
                </Head>
                <div
                    className="hero min-h-[40vh]"
                    style={{
                        backgroundImage:
                            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
                    }}
                >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-3xl">
                            <h1 className="mb-2 text-3xl font-bold">
                                The Project for Improving Flood Forecasting and
                                Warning System for Cagayan De Oro River Basin
                            </h1>
                            <p className="mb-5 text-base font-semibold uppercase tracking-[0.15em]">
                                Monitoring & Control System
                            </p>
                        </div>
                    </div>
                </div>
                {/* main */}
                <main
                    className={`flex min-h-screen w-full flex-col items-center justify-between p-12 text-primary `}
                >
                    <div className="flex h-full w-full flex-row ">
                        {/* Generator Card 1 */}
                        <div className=" m-3 flex h-full w-1/3 flex-col overflow-clip rounded-2xl border-2 border-[#575757] bg-[#3E3E3E] pb-5 text-sm font-bold tracking-widest">
                            <div className=" sticky top-0 z-50 mb-7 flex h-20 w-full items-center justify-center bg-[#575757] text-center text-2xl font-normal tracking-widest">
                                CDORFFWC
                            </div>
                            {/* Test */}
                            {/* <div className="text-md m-5 flex flex-col space-y-5 rounded-xl bg-base-100 p-5">
                                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                                    Test Connection
                                </h1>
                                <TestSwitch
                                    id="CDORFFWC"
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
                                    id="CDORFFWC"
                                    statusSet={[
                                        {
                                            key: "statusSet1",
                                            name: "COMMERCIAL POWER",
                                            value: "OFF",
                                        } as Status,
                                        {
                                            key: "statusSet2",
                                            name: "DEG MODE",
                                            value: "MANUAL",
                                        } as Status,
                                        {
                                            key: "statusSet3",
                                            name: "DEG STATUS",
                                            value: "FAILED",
                                        } as Status,
                                        {
                                            key: "statusSet4",
                                            name: "REMOTE OPERATION",
                                            value: "ON",
                                        } as Status,
                                        {
                                            key: "statusSet5",
                                            name: "LOAD ON",
                                            value: "COMMERCIAL POWER",
                                        } as Status,
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
                                    loadStatus="GENERATOR"
                                    genStatus="GENERATING"
                                />
                            </div>

                            {/* Remote Operation */}
                            <div className="text-md m-5 flex flex-col space-y-6 rounded-xl bg-base-100 p-5">
                                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                                    Remote Operation
                                </h1>
                                <RemoteOperation disabled={true} />
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
                                            key: "statusSet1",
                                            name: "DC POWER SUPPLY STATUS",
                                            value: "ALARM",
                                        },
                                        {
                                            key: "statusSet2",
                                            name: "COMMERCIAL POWER",
                                            value: "ON",
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
                                            content:
                                                "Diesel Generator remote operation is ",
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
                                            content:
                                                "Diesel Generator remote operation is ",
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
                                            content:
                                                "Diesel Generator remote operation is ",
                                            statusName: "STARTED",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        {/* Generator Card 2 */}
                        <div className=" m-3 flex h-full w-1/3 flex-col overflow-clip rounded-2xl border-2 border-[#575757] bg-[#3E3E3E] pb-5 text-sm font-bold tracking-widest">
                            <div className="sticky top-0 mb-7 flex h-20 w-full items-center justify-center bg-[#575757] text-center text-2xl font-normal tracking-widest">
                                XR1- LIBONA
                            </div>

                            {/* Generator Control Status */}
                            <div className="text-md m-5 flex flex-col space-y-5 rounded-xl bg-base-100 p-5">
                                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                                    Generator Control Status
                                </h1>
                                <GeneratorControlStatus
                                    id="XR1_LIBONA"
                                    statusSet={[
                                        {
                                            key: "statusSet1",
                                            name: "COMMERCIAL POWER",
                                            value: "ON",
                                        } as Status,
                                        {
                                            key: "statusSet2",
                                            name: "DEG MODE",
                                            value: "AUTO",
                                        } as Status,
                                        {
                                            key: "statusSet3",
                                            name: "DEG STATUS",
                                            value: "GENERATING",
                                        } as Status,
                                        {
                                            key: "statusSet4",
                                            name: "REMOTE OPERATION",
                                            value: "STANDBY",
                                        },
                                        {
                                            key: "statusSet5",
                                            name: "LOAD ON",
                                            value: "COMMERCIAL POWER",
                                        } as Status,
                                        {
                                            key: "statusSet6",
                                            name: "FUEL LEVEL",
                                            value: "HIGH",
                                        } as Status,
                                    ]}
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
                                    id="XR1_LIBONA"
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
                                            content:
                                                "Diesel Generator remote operation is ",
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
                                            content:
                                                "Diesel Generator remote operation is ",
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
                                            content:
                                                "Diesel Generator remote operation is ",
                                            statusName: "STARTED",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        {/* Generator Card 3 */}
                        <div className=" m-3 flex h-full w-1/3 flex-col overflow-clip rounded-2xl border-2 border-[#575757] bg-[#3E3E3E] pb-5 text-sm font-bold tracking-widest">
                            <div className=" sticky top-0 mb-7 flex h-20 w-full items-center justify-center bg-[#575757] text-center text-2xl font-normal tracking-widest">
                                XR2 - DAGUMBAAN
                            </div>

                            {/* Generator Control Status */}
                            <div className="text-md m-5 flex flex-col space-y-5 rounded-xl bg-base-100 p-5">
                                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                                    Generator Control Status
                                </h1>
                                <GeneratorControlStatus
                                    id="XR2_DAGUMBAAN"
                                    statusSet={[
                                        {
                                            key: "statusSet1",
                                            name: "COMMERCIAL POWER",
                                            value: "OFF",
                                        } as Status,
                                        {
                                            key: "statusSet2",
                                            name: "DEG MODE",
                                            value: "MANUAL",
                                        } as Status,
                                        {
                                            key: "statusSet3",
                                            name: "DEG STATUS",
                                            value: "FAILED",
                                        } as Status,
                                        {
                                            key: "statusSet4",
                                            name: "REMOTE OPERATION",
                                            value: "ON",
                                        } as Status,
                                        {
                                            key: "statusSet5",
                                            name: "LOAD ON",
                                            value: "COMMERCIAL POWER",
                                        } as Status,
                                        {
                                            key: "statusSet6",
                                            name: "FUEL LEVEL",
                                            value: "LOW",
                                        } as Status,
                                    ]}
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
                                    id="XR2_DAGUMBAAN"
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
                                            value: "GOOD",
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
                                            content:
                                                "Diesel Generator remote operation is ",
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
                                            statusType: "success",
                                            content:
                                                "Diesel Generator remote operation is ",
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
                                            statusType: "warning",
                                            content:
                                                "Diesel Generator remote operation is ",
                                            statusName: "STARTED",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

function AuthShowcase() {
    const { data: sessionData } = useSession();

    const secretMessage = "secret message";

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
                {sessionData && (
                    <span>Logged in as {sessionData.user?.name}</span>
                )}
                {secretMessage && <span> - {secretMessage}</span>}
            </p>
            <button
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                }
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
}
